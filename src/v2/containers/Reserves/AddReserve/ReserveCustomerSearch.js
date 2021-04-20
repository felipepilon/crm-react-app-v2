import React from 'react';
import { Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomerData from './ReserveCustomerData';
import CustomerSelect from '../../../components/CustomerSelect/CustomerSelect';

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
        <Box display='flex' flexDirection='column' >
            <Box display='flex' justifyContent='center'>
                <Typography variant='h6'>
                    <FormattedMessage id='Customer Search' />
                </Typography>
            </Box>
            <CustomerSelect handleSelect={handleCustomerSelect}/>
            {
                props.customer.customer_id ?
                <ReserveCustomerData customer={props.customer}/> :
                <Typography variant='body1' style={{marginTop: theme.spacing(1)}}>
                    <FormattedMessage id="Use filter above to search for a customer"/>
                </Typography>
            }
            <Box display='flex' justifyContent='flex-end' marginTop={1}>
                <Button variant='contained'
                    disabled={props.customer.customer_id ? false : true}
                    onClick={handleCleanClick}
                >
                    <FormattedMessage id='Clean' />
                </Button>
                <Button variant='contained' color='primary'
                    disabled={props.customer.customer_id ? false : true}
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