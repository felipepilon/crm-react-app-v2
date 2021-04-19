import { OutlinedInput } from '@material-ui/core';
import React from 'react';

const EditFieldNumber = ({field, values, handleFieldChange}) => {
    const value = values[field.key] || '';

    const _handleFieldChange = (e) => {
        handleFieldChange(field.key, e.target.value || null);
    }
    
    return (
        <OutlinedInput
            onChange={_handleFieldChange} 
            value={value}
            fullWidth
            type='number'
        />
    );
}
 
export default EditFieldNumber;