import { Paper, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import BirthdayMessage from './BirthdayMessage';
import Reserves from '../reserves-open/Reserves';
import LoadingAbsoluteBox from '../../components/LoadingAbsoluteBox';
import LastContact from './LastContact';

const ContactTopics = ({customer, setReservesLastUpdated, reservesLastUpdate, contactsLastUpdate}) => {
    const theme = useTheme();
    const [resLoading, setResLoading] = useState(true);
    const [lastContLoading, setLastContLoading] = useState(true);

    return (
        <Paper style={{display: 'flex', width: '100%', padding: theme.spacing(2), flexDirection: 'column', boxSizing: 'border-box', position: 'relative'}}>
            <Typography variant='subtitle1'><FormattedMessage id='Topics'/></Typography>
            <BirthdayMessage customer={customer}/>
            <LastContact
                customer_id={customer.customer_id} 
                setLoading={setLastContLoading} 
                loading={lastContLoading} 
                contactsLastUpdate={contactsLastUpdate}
            />
            <Reserves customer_id={customer.customer_id} 
                setLoading={setResLoading} 
                loading={resLoading} 
                setReservesLastUpdated={setReservesLastUpdated}
                reservesLastUpdate={reservesLastUpdate}
            />
            <LoadingAbsoluteBox loading={resLoading || lastContLoading}/>
        </Paper>
    );
}
 
export default ContactTopics;