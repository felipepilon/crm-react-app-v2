import { Paper, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import BirthdayMessage from './BirthdayMessage';
import LastContact from './LastContact';
import { FormattedMessage } from 'react-intl';
import OpenReserves from './OpenReserves';

const ContactTopics = ({
    store_group_code, customer, 
    setReservesLastUpdated, reservesLastUpdate, 
    contactsLastUpdate
}) => {
    const theme = useTheme();

    return (
        <Paper style={{display: 'flex', width: '100%', padding: theme.spacing(2), flexDirection: 'column', boxSizing: 'border-box', position: 'relative'}}>
            <Typography variant='subtitle1'><FormattedMessage id='Topics'/></Typography>
            <BirthdayMessage customer={customer}/>
            <LastContact store_group_code={store_group_code} customer={customer}
                contactsLastUpdate={contactsLastUpdate}
            />
            <OpenReserves store_group_code={store_group_code} customer={customer} 
                lastUpdate={reservesLastUpdate} setLastUpdate={setReservesLastUpdated}
            />
        </Paper>
    );
}
 
export default ContactTopics;