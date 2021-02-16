import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';
import FieldInputMask from '../fields/FieldInputMask';
import { KeyboardDatePicker } from '@material-ui/pickers';

const EnhancedFieldInput = (props) => {
    const intl = useIntl();

    const handleChange = (newValue) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.name, newValue)
    }

    if (props.mask === 'date') {
        return (
            <KeyboardDatePicker
                value={props.value}
                onChange={handleChange}
                format="dd/MM/yyyy"
                inputVariant="outlined"
                clearable
                fullWidth
                size='small'
                error={props.error ? true : false}
                helperText={props.error ? intl.formatMessage({id: props.error}) : null}
                invalidDateMessage={intl.formatMessage({id: 'Invalid date'})}
            />
        )
    }

    return (
        <TextField
            fullWidth
            size='small'
            value={props.value}
            onChange={(e) => handleChange(e.target.value || null)}
            variant='outlined'
            error={props.error ? true : false}
            helperText={props.error && intl.formatMessage({ id: props.error })}
            InputProps={
                props.mask ? { inputComponent: FieldInputMask[props.mask] } : null
            }
        />
    );
}
 
export default EnhancedFieldInput;