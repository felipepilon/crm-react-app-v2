import React, { useState, useEffect, useContext } from 'react';
import { Paper, useTheme, Typography, Box } from '@material-ui/core';
import ContactReason from './ContactReason';
import { FormattedMessage } from 'react-intl';
import WhatsAppButton from './WhatsAppButton';
import PhoneCallButton from './PhoneCallButton';
import WhatsAppMsgPanel from './WhatsAppMsgPanel';
import PhoneCallPanel from './PhoneCallPanel';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { AppStateContext } from '../../contexts/AppState';
import { 
    post_Contact,
} from '../../services/Contact';
import { useLocation } from 'react-router-dom';
import DisabledAbsoluteBox from '../../components/DisabledAbsoluteBox';

const ContactCenter = ({customer, setContactsLastUpdate}) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const loc = useLocation();
    const theme = useTheme();
    
    const [ contact, setContact ] = useState({
        status: 'New',
        store_group_id: customer.store_group_id,
        customer_id: customer.customer_id,
        reasons: []
    });
    const [ contactVia, setContactVia ] = useState(null);
    const [ anotherRsnReq, setAnotherRsnReq ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const handleWhatsAppButtonClick = () => handleContactViaSelected('WhatsApp');

    const handlePhoneCallButtonClick = () => handleContactViaSelected('Phone Call');

    const handleContactViaSelected = (newContactVia) => {
        let newErrors = {}

        if (!contact.store_id)
            newErrors.store_id = 'Select a store';

        if (!contact.salesman_id)
            newErrors.salesman_id = 'Select a salesman';

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

    const handleSalesmanIdChange = (salesman_id) => setContact((prevContact) => ({...prevContact, salesman_id}));

    const handleStoreIdChange = (store_id) => setContact((prevContact) => ({...prevContact, store_id}));

    const handleReasonsChange = (reasons) => setContact((prevContact) => ({...prevContact, reasons}));

    const handleAnotherReasonChange = (another_reason) => setContact((prevContact) => ({...prevContact, another_reason}));

    const handleEndContact = () => {
        post_Contact({
            contact_id: contact.contact_id,
            customer_id: contact.customer_id,
            status: 'Completed',
            contact_end_date: new Date(),
            reminder_date: loc.state && loc.state.reminder_date
        })
        .then(() => {
            setContact({
                status: 'New',
                store_group_id: contact.store_group_id,
                customer_id: contact.customer_id,
                store_id: contact.store_id,
                salesman_id: contact.salesman_id,
                reasons: []
            });
            setContactVia(null);
            setContactsLastUpdate(new Date());
            setSucessSnack('Contacted registered successully');
        });
    }

    useEffect(() => {
        const {store_id, ...other} = errors;
        if (store_id)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.store_id])

    useEffect(() => {
        const {salesman_id, ...other} = errors;
        if (salesman_id)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.salesman_id])

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
                        store_id={contact.store_id}
                        error={errors.store_id}
                        handleStoreIdChange={handleStoreIdChange}
                    />
                    <SalesmanSelect
                        store_id={contact.store_id}
                        salesman_id={contact.salesman_id}
                        error={errors.salesman_id}
                        handleSalesmanIdChange={handleSalesmanIdChange}
                    />
                    <ContactReason 
                        reasons={contact.reasons}
                        another_reason={contact.another_reason}
                        reasonError={errors.reasons && errors.reasons.h}
                        anotherReasonError={errors.another_reason}
                        handleReasonsChange={handleReasonsChange}
                        handleAnotherReasonChange={handleAnotherReasonChange}
                        anotherRsnReq={anotherRsnReq}
                        reason_type={loc.state && loc.state.reason_type}
                    />
                    <Typography 
                        variant='body2' 
                        style={{
                            marginTop: theme.spacing(2),
                            color: disabled ? theme.palette.text.disabled : null
                        }}
                    >
                        <FormattedMessage id='Contact Via'/>
                    </Typography>
                    <Box display='flex'>
                        <WhatsAppButton 
                            handleClick={handleWhatsAppButtonClick} 
                            contactVia={contactVia}
                        />
                        <PhoneCallButton 
                            handleClick={handlePhoneCallButtonClick} 
                            contactVia={contactVia}
                        />
                    </Box>
                </Box>
                <Box
                    flex='1'
                >
                    {
                        contactVia ?
                        contactVia === 'Phone Call' ?
                        <PhoneCallPanel 
                            customer={customer} 
                            contact={contact}
                            contactVia={contactVia}
                            setContact={setContact}
                            handleEndContact={handleEndContact}
                        /> :
                        <WhatsAppMsgPanel 
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