import React, { Fragment } from 'react';
import { Typography, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomerData from './ReserveCustomerData';

const ReserveCustomerShow = (props) => {
    const theme = useTheme();

    return (
        <Fragment>
            <Box
                display='flex'
                justifyContent='center'
            >
                <Typography variant='h6'>
                    <FormattedMessage id='Customer' />
                </Typography>
            </Box>
            {
                props.customer.customer_id ?
                <ReserveCustomerData customer={props.customer}/> :
                <Typography variant='body1' style={{marginTop: theme.spacing(1)}}>
                    <FormattedMessage id='Please inform a customer'/>
                </Typography>
            }
        </Fragment>
    );
};
 
export default ReserveCustomerShow;