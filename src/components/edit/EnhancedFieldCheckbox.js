import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const EnhancedFieldCheckbox = (props) => {
    const checked = typeof props.data[props.field.name] !== 'undefined' && props.data[props.field.name] ? true : false;
    
    const handleChange = (newValue) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.field.name, newValue)
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => handleChange(e.target.checked)}
                    color="primary"
                />
            }
        />
    );
}
 
export default EnhancedFieldCheckbox;