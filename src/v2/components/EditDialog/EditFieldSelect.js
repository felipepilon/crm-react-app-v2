import { MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const EditFieldSelect = ({field, values, handleFieldChange}) => {
    const value = values[field.key] || '';

    const intl = useIntl();

    const [options, setOptions] = useState([{
        value,
        label: ''
    }]);

    useEffect(() => {
        let _newOptions = [];

        if (!field.hideEmpty) {
            _newOptions.push({
                value: '',
                label: intl.formatMessage({id: field.required ? '<Select>' : '<None>'})
            })
        }

        if (field.options) {
            _newOptions = _newOptions.concat(field.options.map((opt) => {
                return {
                    value: opt,
                    label: field.intlPrefix ? intl.formatMessage({id: `${field.intlPrefix}${opt}`}) : opt
                };
            }).sort((optA, optB) => optA.label > optB.label));
        }

        setOptions(_newOptions);
    // eslint-disable-next-line
    }, [field.options]);

    const _handleFieldChange = (e) => {
        handleFieldChange(field.key, e.target.value || null);
    }
    
    return (
        <Select
            onChange={_handleFieldChange} 
            value={value}
            fullWidth
            variant='outlined'
            displayEmpty={!field.hideEmpty}
        >
            {
                options.map((opt) => {
                    return (
                        <MenuItem key={opt.value || '_empty'} value={opt.value || ''}>{opt.label}</MenuItem>
                    )
                })
            }
        </Select>
    );
}
 
export default EditFieldSelect;