import { Box, IconButton, Link, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

const AgendaGroupItem = ({customer, reason_type, reminder_date}) => {
    const loc = useLocation();

    const to = {
        pathname: `${loc.pathname}/customers/view/${customer.customer_id}`,
        state: {reason_type, reminder_date, from: loc}
    }

    return (
        <Link component={RouterLink} to={to}>
            <Box display='flex' alignItems='center' width='100%'>
                <Typography style={{flex: '1'}} variant='body2'><FormattedMessage id={customer.name}/></Typography>
                <IconButton size='small'>
                    {
                        !customer.allow_crm_contact ? <BlockIcon/> :
                        customer.contact_count ? <CheckIcon/> : <ContactPhoneIcon/>
                    }
                </IconButton>
            </Box>
        </Link>
    );
}
 
export default AgendaGroupItem;