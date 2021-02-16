import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';

const PageFieldTextMultiline = ({value, handleChange, fieldKey, error, rows}) => {
    const intl = useIntl();

    return (
        <TextField
            fullWidth
            multiline
            rows={rows || 2}
            rowsMax={4}
            size='small'
            value={value || ''}
            onChange={(e) => handleChange(fieldKey, e.target.value || null)}
            variant='outlined'
            error={error ? true : false}
            helperText={error && intl.formatMessage({ id: error })}
        />
    );
}
 
export default PageFieldTextMultiline;