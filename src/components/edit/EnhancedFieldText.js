import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';

const EnhancedFieldText = (props) => {
    const intl = useIntl();

    const value = props.data[props.field.name] || '';
    const error = props.errors[props.field.name] || '';

    const handleChange = (newValue) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.field.name, newValue)
    }

    return (
        <TextField
            fullWidth
            size='small'
            value={value}
            onChange={(e) => handleChange(e.target.value || null)}
            variant='outlined'
            error={error ? true : false}
            helperText={error && intl.formatMessage({ id: error })}
        />
    );
}
 
export default EnhancedFieldText;