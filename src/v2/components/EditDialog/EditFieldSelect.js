import { CircularProgress, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router';

const EditFieldSelect = ({field, values, handleFieldChange}) => {
    const value = values[field.key] || '';

    const intl = useIntl();
    const match = useRouteMatch();

    const [options, setOptions] = useState([{
        value,
        label: ''
    }]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let _newOptions = [];

        if (!field.hideEmpty) {
            _newOptions.push({
                value: '',
                label: intl.formatMessage({id: field.required ? '<Select>' : '<None>'})
            })
        }

        if (typeof field.options === 'object') {
            _newOptions = _newOptions.concat(field.options.map((opt) => {
                return {
                    value: opt,
                    label: field.intlPrefix ? intl.formatMessage({id: `${field.intlPrefix}${opt}`}) : opt
                };
            }).sort((optA, optB) => optA.label > optB.label));

            setOptions(_newOptions);
        } 
        else if (typeof field.options === 'function') 
        {
            setLoading(true);
            
            setTimeout(() => {
                
                field.options({
                    ...match.params,
                    ...field.getOptionsParams
                })
                .then((res) => {
                    _newOptions = _newOptions.concat(res.map((opt) => {
                        return {
                            value: opt[field.valueKey || field.key] || '<unknown value>',
                            label: opt[field.labelKey || field.key] || '<unknown label>'
                        };
                    }).sort((optA, optB) => optA.label > optB.label));
                    
                    setOptions(_newOptions);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                })
            }, 1000);
        } 
        else 
        {
            setOptions(_newOptions);
        }
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
            startAdornment={loading ?
                <CircularProgress size={20}/> :
                null
            }
            readOnly={Boolean(field.readOnly)}
        >
            {
                !loading &&
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