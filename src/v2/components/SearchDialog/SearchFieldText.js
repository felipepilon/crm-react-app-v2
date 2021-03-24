import { OutlinedInput } from '@material-ui/core';
import React, { useEffect } from 'react';

const SearchFieldText = ({field, values, handleFieldChange}) => {
    const { value } = values[field.key] || {};

    const _handleFieldChange = (newValue) => {
        handleFieldChange(field.key, {
            value: newValue || ''
        });
    }

    useEffect(() => {
        if (typeof value === 'undefined')
            _handleFieldChange(null)
    // eslint-disable-next-line
    }, [value])

    return (
        <OutlinedInput
            value={value}
            onChange={(e) => _handleFieldChange(e.target.value)} 
        />
    );
}
 
export default SearchFieldText;