import { Box, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { get_Contacts } from '../../../services/Contact';
import { AppStateContext } from '../../contexts/AppState';

const loadingStatus = '_LastContact';

const LastContact = ({
    store_group_code, customer, contactsLastUpdate
}) => {
    const { addStatus, removeStatus } = useContext(AppStateContext);
    
    const intl = useIntl();

    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        addStatus(loadingStatus);
        loadData();
    // eslint-disable-next-line
    }, [customer, contactsLastUpdate])

    const loadData = () => {
        get_Contacts({
            store_group_code,
            
            customer_code: customer.customer_code,
            status: 'Completed',
            _limit: 1,
            _orderBy: ['contact_date DESC']
        })
        .then((res) => {
            const newContact = res && res.length ? res[0] : null
            setContact(newContact);
            removeStatus(loadingStatus);

            setMessage(
                newContact ?
                'constant.last_contact_msg' :
                'This customer was never contacted'
            )
        });
    }

    if (!message)
        return null;

    let values;
    if (contact) {
        const reasonsSplit = contact.reasons.split(', ');

        let reasons;
        if (reasonsSplit.length === 1) {
            reasons = intl.formatMessage({id: reasonsSplit[0]})
        } else if (reasonsSplit.length) {
            reasons = reasonsSplit.reduce((c, v) => {
                return `${c}${intl.formatMessage({id: `${v}`})}, `;
            }, '');
            reasons = reasons.slice(0, -2);
        }
        
        values = {
            contact_date: `${intl.formatDate(contact.contact_date)} ${intl.formatTime(contact.contact_date)}`,
            salesman_name: contact.salesman_name,
            store_name: contact.store_name,
            reasons
        };
    }

    return (
        <Box display='flex' marginTop={1}>
            <Typography variant='body1'>
                <FormattedMessage id={message} values={values}/>
            </Typography>
        </Box>
    );
}
 
export default LastContact;