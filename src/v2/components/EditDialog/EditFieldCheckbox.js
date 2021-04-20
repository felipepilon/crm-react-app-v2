import { Checkbox } from '@material-ui/core';
import React from 'react';

const EditFieldCheckbox = ({field, values, handleFieldChange}) => {
    const value = values[field.key] || '';

    const _handleFieldChange = (e) => {
        handleFieldChange(field.key, !Boolean(value));
    }

    const checked = Boolean(value);
    
    return (
        <Checkbox color='primary'
            checked={checked}
            onChange={_handleFieldChange} 
        />
    );
}
 
export default EditFieldCheckbox;