import React from 'react';
import ReserveCustomerSearch from './ReserveCustomerSearch';
import ReserveCustomerShow from './ReserveCustomerShow';
import { Paper, useTheme } from '@material-ui/core';

const ReserveCustomer = (props) => {
    const theme = useTheme();

    const isActive = props.step === props.activeStep;
    const width = isActive ? '50%' : '25%';

    return (
        <Paper style={{ margin: theme.spacing(1), padding: theme.spacing(1), width }}>
            {
                isActive ? 
                <ReserveCustomerSearch
                    customer={props.customer}
                    setCustomer={props.setCustomer}
                    handleNextStep={props.handleNextStep}
                /> : 
                <ReserveCustomerShow
                    customer={props.customer}
                />
            }
        </Paper>
    );
};
 
export default ReserveCustomer;