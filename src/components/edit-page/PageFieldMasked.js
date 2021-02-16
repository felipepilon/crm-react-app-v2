import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';
import FieldInputMask from '../fields/FieldInputMask';

const PageFieldMasked = ({value, handleChange, fieldKey, error, mask}) => {
    const intl = useIntl();

    return (
        <TextField
            fullWidth
            size='small'
            value={value || ''}
            onChange={(e) => handleChange(fieldKey, e.target.value || null)}
            variant='outlined'
            error={error ? true : false}
            helperText={error && intl.formatMessage({ id: error })}
            InputProps={
                mask ? { inputComponent: FieldInputMask[mask] } : null
            }
        />
    );
}
 
export default PageFieldMasked;