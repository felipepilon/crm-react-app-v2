import { OutlinedInput } from '@material-ui/core';
import React from 'react';
import MaskedField from '../MaskedField';

const fieldTypes = {
    password: 'password',
    number: 'number'
}

const EditFieldText = ({field, values, handleFieldChange}) => {
    const { key, type, mask } = field;

    const _value = values[field.key] || '';
    const _type = fieldTypes[type];

    const _handleFieldChange = (e) => {
        let _newValue = e.target.value || null;

        if (mask && _newValue)
            _newValue = _newValue.replace(/[^0-9a-zA-Z]/g, "") || null

        handleFieldChange(key, _newValue);
    }

    return (
        <OutlinedInput
            onChange={_handleFieldChange} 
            value={_value}
            fullWidth
            type={_type}
            inputComponent={mask && MaskedField[mask]}
        />
    );
}
 
export default EditFieldText;