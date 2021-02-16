import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedFieldText = (props) => {
    const { field } = props;
    
    const [options, setOptions] = useState(field.options || []);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        if (props.handleFieldChange)
            props.handleFieldChange(field.name, e.target.value || null);
    }

    useEffect(() => {
        if (field.optionsFnc) {
            field.optionsFnc(field.params)
            .then((res) => {
                const newOptions = res.map((opt) => {
                    return {
                        value: opt[field.pickLabelValue || field.name] || '<missing value>',
                        label: opt[field.pickLabelColumn || field.name] || '<missing value>',
                    }   
                });
                setOptions([...options, ...newOptions]);
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = (!loading && props.data[field.name]) || '';
    const error = (!loading && props.errors[field.name]) || '';

    useEffect(() => {
        if (typeof field.default !== 'undefined') {
            props.handleFieldChange(field.name, field.default);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormControl error={error ? true : false} fullWidth size='small'>
            <Select
                value={value}
                onChange={handleChange}
                variant='outlined'
                displayEmpty
                disabled={field.disabled ? true : false}
            >
            {
                loading &&
                <MenuItem value=''></MenuItem>
            }
            {
                !loading && !field.hideSelectOption &&
                <MenuItem value=''>
                    <em><FormattedMessage id='Select'/></em>
                </MenuItem>
            }
            {
                !loading && 
                options.map((opt) => {
                    return (
                        <MenuItem key={opt.value}
                            value={opt.value}
                        >
                            {typeof opt.label !== 'undefined' ? opt.label : opt.value}
                        </MenuItem>
                    )
                })
            }
            </Select>
            {
                error ?
                <FormHelperText><FormattedMessage id={error}/></FormHelperText> :
                null
            }
        </FormControl>
    );
}
 
export default EnhancedFieldText;