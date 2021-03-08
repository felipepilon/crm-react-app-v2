import { Typography } from '@material-ui/core';
import React from 'react';

const EditFieldLabel = ({field, values}) => {
    const value = values[field.key] || '';

    return (
        <Typography variant='body1'>{value}</Typography>
    );
}
 
export default EditFieldLabel;