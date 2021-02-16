import React, { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const PageFieldCheckbox = ({value, defaultValue, fieldKey, handleChange}) => {
    const checked = typeof value !== 'undefined' && value ? true : false;

    useEffect(() => {
        if (typeof defaultValue !== 'undefined' && defaultValue ? true : false) {
            const _value = defaultValue ? true : false;
            handleChange(fieldKey, _value);
        }
        
    // eslint-disable-next-line
    }, [defaultValue])

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => handleChange(fieldKey, e.target.checked)}
                    color="primary"
                />
            }
        />
    );
}
 
export default PageFieldCheckbox;