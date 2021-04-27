import { Paper, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import BirthdayMessage from './BirthdayMessage';
import LastContact from './LastContact';
import { FormattedMessage } from 'react-intl';
import OpenReservesTable from '../OpenReservesTable';

const ContactTopics = ({
    store_group_code, customer, 
    setReservesLastUpdated, reservesLastUpdate, 
    contactsLastUpdate
}) => {
    const theme = useTheme();

    return (
        <Paper style={{display: 'flex', flexDirection: 'column', flex: '1', 
            margin: theme.spacing(1), padding: theme.spacing(1), 
            boxSizing: 'border-box', position: 'relative'
        }}>
            <Typography variant='subtitle1'><FormattedMessage id='Highlights'/></Typography>
            <BirthdayMessage customer={customer}/>
            <LastContact store_group_code={store_group_code} customer={customer}
                contactsLastUpdate={contactsLastUpdate}
            />
            <OpenReservesTable store_group_code={store_group_code} customer={customer} 
                lastUpdate={reservesLastUpdate} setLastUpdate={setReservesLastUpdated}
            />
        </Paper>
    );
}
 
export default ContactTopics;