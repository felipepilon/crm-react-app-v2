import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';

const EnhancedFieldText = ({
    value, defaultValue, handleChange, fieldKey, error,
    loadOptionsFnc, loadOptionsParams, hideSelectOption,
    readOnly, optionValue, optionLabel, options, intlPrefix
}) => {
    const intl = useIntl();

    const [_options, set_Options] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadOptionsFnc) {
            loadOptionsFnc(loadOptionsParams)
            .then((res) => {
                const newOptions = res.map((opt) => {
                    return {
                        value: opt[optionValue || fieldKey] || '<missing value>',
                        label: opt[optionLabel || fieldKey] || '<missing value>',
                    }   
                });
                set_Options(newOptions);
                setLoading(false);
            })
        } else if (options) {
            const newOptions = options.map((opt) => {
                if (typeof opt === 'string') {
                    return {
                        value: opt,
                        label: intl.formatMessage({id: (intlPrefix || '') + opt}),
                    }
                } else {
                    return opt;
                }
            });

            set_Options(newOptions)
            setLoading(false);
        } else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _value = (!loading && value) || '';
    const _error = (!loading && error) || '';
    
    useEffect(() => {
        if (!loading) {
            if (typeof defaultValue !== 'undefined') {
                handleChange(fieldKey, defaultValue);
            } else if (_options.length === 1) {
                handleChange(fieldKey, _options[0].value);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const _hideSelectOption = hideSelectOption || _options.length === 1;

    return (
        <FormControl error={_error ? true : false} fullWidth size='small'>
            <Select
                value={_value}
                onChange={(e) => handleChange(fieldKey, e.target.value || null)}
                variant='outlined'
                displayEmpty
                disabled={readOnly ? true : false}
            >
            {
                loading &&
                <MenuItem value=''></MenuItem>
            }
            {
                !loading && !_hideSelectOption &&
                <MenuItem value=''>
                    <em><FormattedMessage id='Select'/></em>
                </MenuItem>
            }
            {
                !loading && 
                _options.map((opt) => {
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
                _error ?
                <FormHelperText><FormattedMessage id={_error}/></FormHelperText> :
                null
            }
        </FormControl>
    );
}
 
export default EnhancedFieldText;