import React, { useState } from 'react';
import { Paper, Typography, useTheme, Box, Button } from '@material-ui/core';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LabelMasks from '../../../utils/LabelMasks';
import { Fragment } from 'react';
import CustomerEditDialog from '../CustomerEditDialog';

const CustomerDataPaper = ({customer, handleCustomerUpdated}) => {
    const theme = useTheme();
    
    const [openEditCustomer, setOpenEditCustomer] = useState(false);

    return (
        <Paper style={{margin: theme.spacing(1), padding: theme.spacing(1), width: '30%'}}>
            {
                customer.customer_id && 
                <Fragment>
                    <Typography variant='body1'>
                        <FormattedMessage id="CPF"/>
                        : {LabelMasks.cpf(customer.cpf)}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Date of Birth"/>
                        : <FormattedDate value={customer.date_of_birth} timeZone='utc' />
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Email"/>
                        : {customer.email}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Phone 1"/>
                        : {LabelMasks.phone(customer.phone1)}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Phone 2"/>
                        : {LabelMasks.phone(customer.phone2)}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="ZIP"/>
                        : {LabelMasks.zip(customer.zip)}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Address 1"/>
                        : {customer.addr1}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Address 2"/>
                        : {customer.addr2}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="Address 3"/>
                        : {customer.addr3}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="City"/>
                        : {customer.city}
                    </Typography>
                    <Typography variant='body1'>
                        <FormattedMessage id="State"/>
                        : {customer.state}
                    </Typography>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button onClick={(e) => setOpenEditCustomer(true)}><FormattedMessage id='Edit Customer'/></Button>
                    </Box>
                    {
                        openEditCustomer &&
                        <CustomerEditDialog
                            customer={customer}
                            open={openEditCustomer}
                            handleClose={() => setOpenEditCustomer(false)}
                            handleCustomerUpdated={handleCustomerUpdated}
                        />
                    }
                </Fragment>
            }
        </Paper>
    );
}
 
export default CustomerDataPaper;