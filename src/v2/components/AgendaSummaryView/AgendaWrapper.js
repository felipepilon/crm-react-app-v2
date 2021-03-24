import { Box, Paper, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AgendaWrapper = ({children}) => {
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
                <Typography variant='h5'><FormattedMessage id='Agenda'/></Typography>
                {children}
            </Paper>
        </Box>
    );
}
 
export default AgendaWrapper;