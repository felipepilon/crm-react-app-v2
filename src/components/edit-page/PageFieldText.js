import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';

const PageFieldText = ({value, handleChange, fieldKey, error}) => {
    const intl = useIntl();

    return (
        <TextField
            fullWidth
            size='small'
            value={value || ''}
            onChange={(e) => handleChange(fieldKey, e.target.value || null)}
            variant='outlined'
            error={error ? true : false}
            helperText={error && intl.formatMessage({ id: error })}
        />
    );
}
 
export default PageFieldText;