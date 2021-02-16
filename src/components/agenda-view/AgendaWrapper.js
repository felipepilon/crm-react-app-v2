import { Box, Paper, useTheme } from '@material-ui/core';
import React from 'react';

const AgendaWrapper = (props) => {
    const theme = useTheme();

    return (
        <Box flex='1'>
            <Paper
                style={{
                    display: 'flex',
                    position: 'relative',
                    padding: theme.spacing(1),
                    boxSizing: 'border-box',
                    flexDirection: 'column'
                }}
            >
                {props.children}
            </Paper>
        </Box>
    );
}
 
export default AgendaWrapper;