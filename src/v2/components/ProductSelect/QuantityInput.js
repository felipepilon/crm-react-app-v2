import React from 'react';
import { TextField, useTheme } from '@material-ui/core';
import { useIntl } from 'react-intl';

const QuantityInput = (props) => {
    const intl = useIntl();
    const theme = useTheme();

    const handleChange = (e) => {
        const inputValue = e.target.value;
        let newQty = (inputValue && inputValue.replace(/(\D)+/g,'')) || '0';
        newQty = parseInt(newQty);
        newQty = newQty <= 0 ? 1 : newQty;
        props.handleChange(newQty);
    }
        
    return (
        <TextField
            style={{marginTop: theme.spacing(2)}}
            value={props.value}
            onChange={handleChange}
            variant='outlined'
            label={intl.formatMessage({ id: 'Quantity' })}
            error={props.error ? true : false}
            helperText={props.error && intl.formatMessage({ id: props.error })}
            type="number"
        />
    );
}
 
export default QuantityInput;