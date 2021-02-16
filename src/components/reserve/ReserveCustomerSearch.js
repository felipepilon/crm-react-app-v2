import React from 'react';
import { Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomerData from './ReserveCustomerData';
import CustomerSearchIndex from '../fields/CustomerSearchIndex';

const ReserveCustomerSearch = (props) => {
    const theme = useTheme();

    const handleCustomerSelect = (selectedCustomer) => {
        props.setCustomer(selectedCustomer);
    }

    const handleProceedClick = () => {
        props.handleNextStep();
    }

    const handleCleanClick = () => {
        props.setCustomer({});
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            <Box
                display='flex'
                justifyContent='center'

            >
                <Typography variant='h6'>
                    <FormattedMessage id='Customer Search' />
                </Typography>
            </Box>
            <CustomerSearchIndex
                handleCustomerSelect={handleCustomerSelect}
                marginTop={theme.spacing(1)}
            />
            {
                props.customer.customer_id ?
                <ReserveCustomerData
                    customer={props.customer}
                /> :
                <Typography variant='body1' style={{marginTop: theme.spacing(1)}}>
                    <FormattedMessage id="Use filter above to search for a customer"/>
                </Typography>
            }
            <Box
                display='flex'
                justifyContent='flex-end'
                marginTop={1}
            >
                <Button
                    variant='contained'
                    disabled={props.customer.customer_id ? false : true}
                    onClick={handleCleanClick}
                >
                    <FormattedMessage id='Clean' />
                </Button>
                <Button
                    variant='contained'
                    disabled={props.customer.customer_id ? false : true}
                    color='primary'
                    onClick={handleProceedClick}
                    style={{marginLeft: theme.spacing(1)}}
                >
                    <FormattedMessage id='Continue' />
                </Button>
            </Box>
        </Box>
    );
}

export default ReserveCustomerSearch;