import React, { useState, useEffect, useContext } from 'react';
import { Paper, useTheme, Typography, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import StoreSelect from '../../components/StoreSelect';
import { useLocation } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppState';
import { put_Contact } from '../../../services/Contact';
import SalesmanSelect from '../../components/SalesmanSelect';
import ContactReason from '../../components/ContactReasonSelect';
import WhatsAppButton from './WhatsAppButton';
import PhoneCallButton from './PhoneCallButton';
import DisabledAbsoluteBox from '../../../components/DisabledAbsoluteBox';
import PhoneCallPanel from './PhoneCallPanel';
import WhatsAppMsgPanel from './WhatsAppMsgPanel';

const ContactCenter = ({store_group_code, customer, setContactsLastUpdate}) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const loc = useLocation();
    const theme = useTheme();
    
    const [ contact, setContact ] = useState({
        status: 'New',
        customer_code: customer.customer_code,
        reasons: []
    });
    const [ contactVia, setContactVia ] = useState(null);
    const [ anotherRsnReq, setAnotherRsnReq ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const handleWhatsAppButtonClick = () => handleContactViaSelected('WhatsApp');

    const handlePhoneCallButtonClick = () => handleContactViaSelected('Phone Call');
    
    const handleContactViaSelected = (newContactVia) => {
        let newErrors = {}

        if (!contact.store_code)
            newErrors.store_code = 'Select a store';

        if (!contact.salesman_code)
            newErrors.salesman_code = 'Select a salesman';

        if (!contact.reasons)
            newErrors.reasons = { h: 'At least one reason is required' };

        if (anotherRsnReq) {
            if (!contact.another_reason || !contact.another_reason.trim().length)
                newErrors.another_reason = 'Inform details for the contact';
            else if (contact.another_reason.trim().length < 5)
                newErrors.another_reason = 'It must have at least 5 digits';
        }

        setErrors(newErrors);
        
        if (!Object.keys(newErrors).length)
            setContactVia(newContactVia);
    }

    const handleSalesmanIdChange = (salesman_code) => setContact((prevContact) => ({...prevContact, salesman_code}));

    const handleStoreIdChange = (store_code) => setContact((prevContact) => ({...prevContact, store_code}));

    const handleReasonsChange = (reasons) => setContact((prevContact) => ({...prevContact, reasons}));

    const handleAnotherReasonChange = (another_reason) => setContact((prevContact) => ({...prevContact, another_reason}));

    const handleEndContact = () => {
        put_Contact({
            store_group_code,
            contact_id: contact.contact_id,
            params: {
                status: 'Completed',
                contact_end_date: new Date(),
                reminder_date: loc.state && loc.state.reminder_date
            }
        })
        .then(() => {
            setContact({
                status: 'New',
                customer_code: contact.customer_code,
                store_code: contact.store_code,
                salesman_code: contact.salesman_code,
                reasons: []
            });
            setContactVia(null);
            setContactsLastUpdate(new Date());
            setSucessSnack('Contacted registered successully');
        });
    }

    useEffect(() => {
        const {store_code, ...other} = errors;
        if (store_code)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.store_code])

    useEffect(() => {
        const {salesman_code, ...other} = errors;
        if (salesman_code)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.salesman_code])

    useEffect(() => {
        const {reasons, ...other} = errors;
        if (reasons)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.reasons])

    useEffect(() => {
        const ars = contact.reasons.find((rsn) => rsn.reason_type === 'Another');
        setAnotherRsnReq(ars ? true : false);
    // eslint-disable-next-line
    }, [contact.reasons])

    useEffect(() => {
        const {another_reason, ...other} = errors;
        if (another_reason)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.another_reason, anotherRsnReq]);

    const disabled = contact.status !== 'New';

    return (
        <Paper style={{ height: '100%', padding: theme.spacing(1), boxSizing: 'border-box' }}>
            <Box
                display='flex'
                width='100%'
                height='100%'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    width='50%'
                    margin={1}
                >
                    <Typography variant='h6'><FormattedMessage id='Contact Customer'/></Typography>
                    <StoreSelect
                        store_group_code={store_group_code}
                        store_code={contact.store_code}
                        error={errors.store_code}
                        handleChange={handleStoreIdChange}
                    />
                    <SalesmanSelect
                        store_group_code={store_group_code}
                        store_code={contact.store_code}
                        salesman_code={contact.salesman_code}
                        error={errors.salesman_code}
                        handleChange={handleSalesmanIdChange}
                    />
                    <ContactReason 
                        store_group_code={store_group_code}
                        reasons={contact.reasons}
                        another_reason={contact.another_reason}
                        reasonError={errors.reasons && errors.reasons.h}
                        anotherReasonError={errors.another_reason}
                        handleReasonsChange={handleReasonsChange}
                        handleAnotherReasonChange={handleAnotherReasonChange}
                        anotherRsnReq={anotherRsnReq}
                        reason_type={loc.state && loc.state.reason_type}
                    />
                    <Typography variant='body2' style={{
                            marginTop: theme.spacing(2),
                            color: disabled ? theme.palette.text.disabled : null
                        }}
                    >
                        <FormattedMessage id='Contact Via'/>
                    </Typography>
                    <Box display='flex'>
                        <WhatsAppButton handleClick={handleWhatsAppButtonClick} contactVia={contactVia}/>
                        <PhoneCallButton handleClick={handlePhoneCallButtonClick} contactVia={contactVia}/>
                    </Box>
                </Box>
                <Box flex='1'>
                    {
                        contactVia ?
                        contactVia === 'Phone Call' ?
                        <PhoneCallPanel
                            store_group_code={store_group_code}
                            customer={customer} 
                            contact={contact}
                            contactVia={contactVia}
                            setContact={setContact}
                            handleEndContact={handleEndContact}
                        /> :
                        <WhatsAppMsgPanel
                            store_group_code={store_group_code}
                            customer={customer} 
                            contact={contact}
                            contactVia={contactVia}
                            setContact={setContact}
                            handleEndContact={handleEndContact}
                        /> :
                        null
                    }
                </Box>
                <DisabledAbsoluteBox disable={disabled}/>
            </Box>
        </Paper>
    );
}
 
export default ContactCenter;