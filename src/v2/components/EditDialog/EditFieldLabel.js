import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

const EditFieldLabel = ({field, values, handleFieldChange}) => {
    const match = useRouteMatch();

    const [ value, setValue ] = useState({
        value: values[field.key] || '',
        label: values[field.key] || ''
    });

    useEffect(() => {
        if (typeof field.value === 'function') {
            field.value({
                ...match.params,
                ...field.getValueParams
            })
            .then((res) => {
                const _label = typeof field.labelKey === 'function' ?
                    field.labelKey(res) :
                    typeof field.labelKey === 'string' ?
                    res[field.labelKey] 
                    : res[field.key];
                
                const _value = typeof field.valueKey === 'function' ?
                    field.valueKey(res) :
                    typeof field.valueKey === 'string' ?
                    res[field.valueKey] 
                    : res[field.key];
                
                setValue({value: _value, label: _label});
                
                handleFieldChange(field.key, _value);
            })
            .catch((err) => {
                console.error(err);
            })
        }
    // eslint-disable-next-line
    }, [field.value])

    return (
        <Typography variant='body1'>{value.label}</Typography>
    );
}
 
export default EditFieldLabel;