import React, { Fragment, useState, useEffect } from 'react';
import { Typography, useTheme, Button, Paper, TextField, CircularProgress, Box } from '@material-ui/core';
import LabelMasks from '../../../utils/LabelMasks';
import { FormattedMessage, useIntl } from 'react-intl';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import DoneIcon from '@material-ui/icons/Done';
import OnGoingCallTimer from './OnGoingCallTimer';
import ContactFeedback from './ContactFeedback';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { formatISO } from 'date-fns';
import { post_Interactions, put_Contact } from '../../../services/Contact';

const PhoneCallPanel = ({
    contactVia, contact, customer, setContact,
    handleEndContact
}) => {
    const [ panelState, setPanelState ] = useState({
        status: 'New',
    });
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const { store_group_code, contact_id } = contact;

    const theme = useTheme();
    const intl = useIntl();

    const handleFeedbackChange = (feedback) => setPanelState({ ...panelState, ...{feedback}, });

    const handleAnotherFeedbackChange = (another_feedback) => setPanelState({ ...panelState, ...{another_feedback}, });

    const handleReminderDateChange = (reminder_date) => setPanelState({ ...panelState, ...{reminder_date}, });

    const handleNotesChange = (notes) => setPanelState({ ...panelState, ...{notes}, });

    useEffect(() => {
        setLoading(false);
    // eslint-disable-next-line
    }, [])

    const handleStartCall = () => {
        setLoading(true);

        const currentDate = new Date();
        const currentDateISO = formatISO(currentDate);
        
        let newContact = { 
            ...contact,
            status: 'Started',
            contact_start_date: currentDateISO,
            contact_date: currentDateISO
        };

        setContact(newContact);

        const interactions = [{
            contact_via: contactVia,
            interaction_type: 'Call Started',
            interaction_text: 'Call started at: {t1}',
            interaction_date: currentDateISO,
            t1: `${intl.formatDate(new Date())} ${intl.formatTime(new Date())}`
        }];

        contact.reasons.forEach((rsn) => {
            interactions.push({
                contact_via: contactVia,
                interaction_type: 'Contact Reason',
                interaction_text: rsn.reason_type === 'Another' ? 'Reason: {t1}, {t2}' : 'Reason: {t1}',
                interaction_date: currentDateISO,
                t1: rsn.reason_description,
                t2: contact.another_reason,
            });
        });
        
        put_Contact({
            store_group_code, contact_id, interactions,
            ...newContact,        
        })
        .then((res) => {
            newContact = { 
                ...newContact,
                ...{ 
                    contact_id: res.contact_id,
                    interactions: res.interactions,
                }
            };

            setContact(newContact);
            setPanelState({
                ...panelState,
                status: 'On Going',
                start_date: currentDate
            });
            setLoading(false);
        });
    }

    const handleEndCall = () => {
        setLoading(true);

        const currentDate = new Date();
        const currentDateISO = formatISO(currentDate);

        const newInter = {
            contact_id: contact.contact_id,
            contact_via: contactVia,
            interaction_type: 'Call Ended',
            interaction_text: 'Call ended at: {t1}',
            interaction_date: currentDateISO,
            t1: `${intl.formatDate(currentDate)} ${intl.formatTime(currentDate)}`
        }

        let newPanelState = {
            ...panelState,
            end_date: currentDate
        };

        setPanelState(newPanelState);

        setTimeout(() => {
            post_Interactions({
                store_group_code, contact_id,
                params: [newInter]
            })
            .then((result) => {
                setContact({
                    ...contact,
                    interactions: [
                        ...contact.interactions,
                        ...result,
                    ]
                });

                newPanelState = {
                    ...newPanelState,
                    status: 'Waiting Feedback'
                };

                setPanelState(newPanelState);
                setLoading(false);
            });
        }, 1000)
    }

    const handleEndContactClick = () => {
        const newErrors = {};

        if (!panelState.feedback)
            newErrors.feedback = 'Inform a feedback';

        if (panelState.feedback === 'Another' && !panelState.another_feedback)
            newErrors.another_feedback = 'Provide details';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        const newInters = [];

        setLoading(true);

        const currentDate = new Date();
        const currentDateISO = formatISO(currentDate);

        if (panelState.feedback) {
            newInters.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Feedback',
                interaction_text: 'Feedback: {t1}',
                interaction_date: currentDateISO,
                t1: panelState.feedback === 'Another' ? 
                    panelState.another_feedback :
                    intl.formatMessage({id: panelState.feedback}),
            });
        }

        if (panelState.reminder_date) {
            newInters.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Reminders',
                interaction_text: 'Remind customer at: {t1}',
                interaction_date: currentDateISO,
                t1: intl.formatDate(panelState.reminder_date),
            });
        }

        if (panelState.notes) {
            newInters.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Notes',
                interaction_text: 'Contact notes: {t1}',
                interaction_date: currentDateISO,
                t1: panelState.notes,
            });
        }

        setTimeout(() => {
            if (newInters.length)
                post_Interactions({
                    store_group_code, contact_id,
                    params: newInters
                })
                .then(() => handleEndContact());
            else 
                handleEndContact();
        }, 1000);
    }

    return (
        <Paper style={{ 
            height: '100%',
            padding: theme.spacing(1), 
            boxSizing: 'border-box', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <Typography variant='h5' style={{ margin: theme.spacing(2) }}>
                {LabelMasks.phone(customer.phone1)}
            </Typography>
            {
                panelState.status === 'New' ?
                <Button
                    style={{margin: theme.spacing(1)}}
                    endIcon={<CallIcon/>}
                    variant='contained'
                    color='primary'
                    onClick={handleStartCall}
                >
                    <FormattedMessage id='Start Call'/>
                </Button> :
                null
            }
            {
                ['On Going', 'Waiting Feedback'].includes(panelState.status) ?
                <OnGoingCallTimer
                    start_date={panelState.start_date}
                    end_date={panelState.end_date}
                /> :
                null
            }
            {
                panelState.status === 'On Going' ?
                <Button
                    variant='contained'
                    color='primary'
                    style={{margin: theme.spacing(1)}}
                    onClick={handleEndCall}
                    endIcon={<CallEndIcon/>}
                >
                    <FormattedMessage id='End Call'/>
                </Button> :
                null
            }
            {
                ['On Going', 'Waiting Feedback'].includes(panelState.status) ?
                <Fragment>
                    <ContactFeedback
                        feedback={panelState.feedback}
                        another_feedback={panelState.another_feedback}
                        handleFeedbackChange={handleFeedbackChange}
                        handleAnotherFeedbackChange={handleAnotherFeedbackChange}
                        feedbackError={errors.feedback}
                        anotherFeedbackError={errors.another_feedback}
                        contactVia={contactVia}
                    />
                    <KeyboardDatePicker
                        style={{marginTop: theme.spacing(1)}}
                        label={intl.formatMessage({ id: 'Call Again At' })}
                        value={panelState.reminder_date || null}
                        onChange={(value) => handleReminderDateChange(value)}
                        format="dd/MM/yyyy"
                        clearable
                        fullWidth
                        error={errors.reminder_date ? true : false}
                        helperText={errors.reminder_date ? intl.formatMessage({id: errors.reminder_date}) : null}
                        invalidDateMessage={intl.formatMessage({id: 'Invalid date'})}
                    />
                    <TextField
                        style={{marginTop: theme.spacing(2)}}
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={panelState.notes || ''}
                        onChange={(e) => handleNotesChange(e.target ? e.target.value : null)}
                        error={errors.notes ? true : false}
                        helperText={errors.notes ? intl.formatMessage({id: errors.notes}) : null}
                        label={intl.formatMessage({id: 'Notes'})}
                    />
                </Fragment> :
                null
            }
            {
                panelState.status === 'Waiting Feedback' ?
                <Button
                    style={{marginTop: theme.spacing(3)}}
                    variant='contained'
                    color='primary'
                    fullWidth
                    endIcon={<DoneIcon/>}
                    onClick={handleEndContactClick}
                >
                    <FormattedMessage id='End Contact'/>
                </Button> :
                null
            }
            
            {
                loading ?
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                >
                    <CircularProgress/>
                </Box> : 
                null
            }
        </Paper>
    );
}
 
export default PhoneCallPanel;