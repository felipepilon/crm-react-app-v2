import React, { Fragment, useContext } from 'react';
import { Paper, Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { WorkspaceContext } from '../../../contexts/Workspace';
import StoreSelect from '../../../components/StoreSelect';
import SalesmanSelect from '../../../components/SalesmanSelect';

const ReserveCheckout = ({
    handleConfirmReserve, step, activeStep, disableSubmit, 
    store_code, handleStoreChange, salesman_code, handleSalesmanChange,
    reminder_date, handleReminderDateChange
}) => {
    const { store_group_code } = useContext(WorkspaceContext);

    const theme = useTheme();
    const intl = useIntl();
    
    const isActive = step === activeStep;
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
                        store_group_code={store_group_code}
                        store_code={store_code}
                        handleChange={handleStoreChange}
                    />
                    <SalesmanSelect 
                        store_group_code={store_group_code}
                        store_code={store_code}
                        salesman_code={salesman_code}
                        handleChange={handleSalesmanChange}
                    />
                    <KeyboardDatePicker format="dd/MM/yyyy" clearable disablePast
                        value={reminder_date}
                        style={{marginTop: theme.spacing(2)}}
                        label={intl.formatMessage({ id: 'Remember me at' })}
                        onChange={handleReminderDateChange}
                    />
                </Fragment> :
                null
            }
            <Button fullWidth variant='contained' color='primary'
                disabled={disableSubmit}
                onClick={handleConfirmReserve}
                style={{marginTop: theme.spacing(2)}}
            >
                <FormattedMessage id='Confirm reserve'/>
            </Button>
        </Paper>
    );
};
 
export default ReserveCheckout;