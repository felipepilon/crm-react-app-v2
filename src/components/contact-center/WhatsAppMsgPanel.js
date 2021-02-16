import React, { useEffect, useState, Fragment } from 'react';
import { Typography, useTheme, Button, Paper, CircularProgress, TextField, Box, Checkbox, FormControlLabel, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';
import { FormattedMessage, useIntl } from 'react-intl';
import SendIcon from '@material-ui/icons/Send';
import DoneIcon from '@material-ui/icons/Done';
import { 
    post_Contact,
    post_Interactions,
} from '../../services/Contact';
import ContactFeedback from './ContactFeedback';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { formatISO } from 'date-fns';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MsgPresetSelectionDialog from './MsgPresetSelectionDialog';
import { get_ContactMsgPresets } from '../../services/ContactMsgPreset';

const WhatsAppMsgPanel = ({contact, contactVia, customer, setContact, handleEndContact}) => {
    const theme = useTheme();
    const intl = useIntl();

    const [ panelState, setPanelState ] = useState({
        status: 'Starting',
        open_whatsapp: true,
    });
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ msgPresetDialogOpen, setMsgPresetDialogOpen ] = useState(false);

    const handleStatusChange = (status) => setPanelState({ ...panelState, ...{status}, });

    const handleOpenWhatsAppChange = (open_whatsapp) => setPanelState({ ...panelState, ...{open_whatsapp}, });

    const handleOutMsgChange = (out_msg) => setPanelState({ ...panelState, ...{out_msg}, });

    const handleFeedbackChange = (feedback) => setPanelState({ ...panelState, ...{feedback}, });

    const handleAnotherFeedbackChange = (another_feedback) => setPanelState({ ...panelState, ...{another_feedback}, });
    
    const handleReminderDateChange = (reminder_date) => setPanelState({ ...panelState, ...{reminder_date}, });

    const handleNotesChange = (notes) => setPanelState({ ...panelState, ...{notes}, });

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            get_ContactMsgPresets({
                reasons: contact.reasons.map((rsn) => rsn.contact_reason_id),
                contact_via: contactVia, 
                active: true,
                is_default: true
            })
            .then((res) => {
                setPanelState({ 
                    ...panelState,
                    ...{
                        status: 'Ready To Send',
                        out_msg: res.length ? res[0].text : null,
                    }, 
                });
        
                setLoading(false);
            })
        }, 500);
    // eslint-disable-next-line
    }, [contact.reasons, contactVia]);
    
    useEffect(() => {
        const {feedback, ...other} = errors;
        if (feedback)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.feedback]);

    useEffect(() => {
        const {another_feedback, ...other} = errors;
        if (another_feedback)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.another_feedback]);

    useEffect(() => {
        const {reminder_date, ...other} = errors;
        if (reminder_date)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.reminder_date]);

    useEffect(() => {
        const {notes, ...other} = errors;
        if (notes)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.notes]);
    
    const handleSendMsg = (e) => {
        setLoading(true);
        
        const newErrors = {};
     
        if (!panelState.out_msg)
            newErrors.out_msg = 'Inform a message';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        const currentDate = new Date();
        const currentDateISO = formatISO(currentDate);

        let text = panelState.out_msg.replace(/\n/g,'%0A');
        const href = `https://api.whatsapp.com/send?phone=55${customer.phone1}&text=${text}`;

        if (!contact.contact_id) {
            let newContact = { 
                ...contact,
                ...{ 
                    status: 'Started',
                    contact_start_date: currentDateISO,
                    contact_date: currentDateISO,
                }
            };
    
            setContact(newContact);

            const interactions = [{
                contact_via: contactVia,
                interaction_type: 'Call Started',
                interaction_text: 'Call started at: {t1}',
                interaction_date: currentDateISO,
                t1: `${intl.formatDate(currentDate)} ${intl.formatTime(currentDate)}`
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

            interactions.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Message Sent',
                interaction_text: 'Sent: {t1}',
                interaction_date: currentDateISO,
                t1: panelState.out_msg,
            });

            setTimeout(() => {
                post_Contact({
                    ...newContact,
                    ...{
                        interactions,
                    }
                })
                .then((result) => {
                    newContact = { 
                        ...newContact,
                        ...{ 
                            contact_id: result.contact_id,
                            interactions: result.interactions,
                        }
                    };
    
                    setContact(newContact);

                    handleStatusChange('Waiting Feedback')

                    if (panelState.open_whatsapp)
                        window.open(href, '_blank');

                    setLoading(false);
                })
            }, 1000);
        } else {
            const newInter = {
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Message Sent',
                interaction_text: 'Sent: {t1}',
                interaction_date: currentDateISO,
                t1: panelState.out_msg,
            };

            setTimeout(() => {
                 post_Interactions([newInter])
                .then((result) => {
                    setContact({
                        ...contact,
                        ...{
                            interactions: [
                                ...contact.interactions,
                                ...result,
                            ]
                        }
                    });    
    
                    handleStatusChange('Waiting Feedback')

                    if (panelState.open_whatsapp)
                        window.open(href, '_blank');

                    setLoading(false);
                })
            }, 1000);
        }
    }

    const handleEndContactClick = (e) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {};
     
        if (!panelState.feedback)
            newErrors.feedback = 'Inform a feedback';

        if (['Another', 'Replied'].includes(panelState.feedback) && !panelState.another_feedback)
            newErrors.another_feedback = 'Provide details';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        const newInters = [];

        newInters.push({
            contact_id: contact.contact_id,
            contact_via: contactVia,
            interaction_type: 'Feedback',
            interaction_text: 'Feedback: {t1}',
            interaction_date: new Date(),
            t1: ['Another', 'Replied'].includes(panelState.feedback) ? 
                panelState.another_feedback :
                intl.formatMessage({id: panelState.feedback}),
        });

        if (panelState.reminder_date) {
            newInters.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Reminders',
                interaction_text: 'Remind customer at: {t1}',
                interaction_date: new Date(),
                t1: intl.formatDate(panelState.reminder_date),
            });
        }

        if (panelState.notes) {
            newInters.push({
                contact_id: contact.contact_id,
                contact_via: contactVia,
                interaction_type: 'Notes',
                interaction_text: 'Contact notes: {t1}',
                interaction_date: new Date(),
                t1: panelState.notes,
            });
        }

        setTimeout(() => {
            post_Interactions(newInters).then(() => handleEndContact());
        }, 1000);
    }


    useEffect(() => {
        if (errors.out_msg)
            setErrors({ ...errors, ...{out_msg: null}});
    // eslint-disable-next-line
    }, [panelState.out_msg])

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
                panelState.status === 'Ready To Send' ?
                <Fragment>
                    <TextField
                        multiline
                        fullWidth
                        variant='outlined'
                        size='small'
                        rowsMax={4}
                        value={panelState.out_msg || ''}
                        onChange={(e) => handleOutMsgChange(e.target ? e.target.value : null)}
                        label={intl.formatMessage({id: 'Send Message'})}
                        error={errors.out_msg ? true : false}
                        helperText={errors.out_msg ? intl.formatMessage({id: errors.out_msg}) : null}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <Tooltip title={intl.formatMessage({id: 'Message Presets'})}>
                                    <IconButton size='small' onClick={() => setMsgPresetDialogOpen(true)}>
                                        <LibraryBooksIcon/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }}
                    />
                    <Box display='flex' justifyContent='flex-end' alignItems='center'  width='100%' marginTop={1}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={panelState.open_whatsapp} 
                                    onChange={() => handleOpenWhatsAppChange(!panelState.open_whatsapp)}
                                    color='primary'
                                />
                            }
                            label={intl.formatMessage({id: 'Open WhatsApp'})}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSendMsg}
                            endIcon={<SendIcon/>}
                        >
                            <FormattedMessage id='Send'/>
                        </Button>
                    </Box>
                </Fragment> :
                null
            }
            {
                panelState.status === 'Waiting Feedback' ?
                <Fragment>
                    <Typography variant='body2'>
                        <FormattedMessage id='You send: {out_msg}' values={panelState}/>
                    </Typography>
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
                        label={intl.formatMessage({ id: 'Contact Again At' })}
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
                    <Button
                        style={{marginTop: theme.spacing(3)}}
                        variant='contained'
                        color='primary'
                        fullWidth
                        endIcon={<DoneIcon/>}
                        onClick={handleEndContactClick}
                    >
                        <FormattedMessage id='End Contact'/>
                    </Button>
                </Fragment> : 
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
            <MsgPresetSelectionDialog 
                open={msgPresetDialogOpen} 
                setOpen={setMsgPresetDialogOpen}
                reasons={contact.reasons.map((rsn) => rsn.contact_reason_id)}
                contact_via={contactVia}
                handleTextSelect={(text) => handleOutMsgChange(text)}
            />
        </Paper>
    );
}
 
export default WhatsAppMsgPanel;