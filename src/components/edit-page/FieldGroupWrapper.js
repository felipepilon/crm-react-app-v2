import { Paper, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const FieldGroupWrapper = ({title, children}) => {
    const theme = useTheme();

    return (
        <Paper
            style={{
                padding: theme.spacing(1),
                width: '100%', 
                maxWidth: '540px',
                flexDirection: 'column',
                marginBottom: theme.spacing(1)
            }}
        >
            {
                title &&
                <Typography variant='subtitle1'>
                    <FormattedMessage id={title}/>
                </Typography>
            }
            {children}
        </Paper>
    );
}
 
export default FieldGroupWrapper;