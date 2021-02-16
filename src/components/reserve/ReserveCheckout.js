import React, { Fragment } from 'react';
import { Paper, Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { KeyboardDatePicker } from "@material-ui/pickers";

const ReserveCheckout = (props) => {
    const theme = useTheme();

    const intl = useIntl();

    const handleConfirmReserve = (e) => {
        e.preventDefault();
        props.handleConfirmReserve();
    }

    const isActive = props.step === props.activeStep;
    const width = isActive ? '50%' : '25%';

    return (
        <Paper style={{ 
            margin: theme.spacing(1), 
            padding: theme.spacing(1), 
            width, 
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box display='flex' justifyContent='center'>
                <Typography variant='h6'>
                    <FormattedMessage id='Confirm'/>
                </Typography>
            </Box>
            {
                isActive ?
                <Fragment>
                    <StoreSelect
                        store_id={props.store_id}
                        handleStoreIdChange={props.handleStoreIdChange}
                    />
                    <SalesmanSelect
                        salesman_id={props.salesman_id}
                        handleSalesmanIdChange={props.handleSalesmanIdChange}
                        store_id={props.store_id}
                    />
                    <KeyboardDatePicker
                        style={{marginTop: theme.spacing(2)}}
                        label={intl.formatMessage({ id: 'Remember Me At' })}
                        value={props.reminderDate}
                        onChange={props.setReminderDate}
                        format="dd/MM/yyyy"
                        clearable
                        disablePast
                    />
                </Fragment> :
                null
            }
            <Button
                fullWidth
                variant='contained'
                color='primary'
                disabled={props.disableSubmit}
                onClick={handleConfirmReserve}
                style={{marginTop: theme.spacing(2)}}
            >
                <FormattedMessage id='Confirm reserve'/>
            </Button>
        </Paper>
    );
};
 
export default ReserveCheckout;