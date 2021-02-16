import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { get_Contacts } from '../../services/Contact';

const LastContact = ({contactsLastUpdate, customer_id, loading, setLoading}) => {
    const intl = useIntl();

    const [contact, setContact] = useState(null);

    useEffect(() => {
        setLoading(true);
        loadData();
    // eslint-disable-next-line
    }, [customer_id, contactsLastUpdate])

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

    const message = loading ? 'Loading previous contacts...' :
        contact ? '<Last contact message>' :
        'This customer was never contacted';

    const loadData = () => {
        get_Contacts({limit: 1, customer_id, status: 'Completed'})
        .then((res) => {
            setContact(res && res.length ? res[0] : null);
            setLoading(false);
        });
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