import React from 'react';
import { Paper, useTheme } from '@material-ui/core';

const IndicatorWrapper = (props) => {
    const theme = useTheme();

    return (
        <Paper
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}
        >
            {props.children}
        </Paper>
    );
}
 
export default IndicatorWrapper;