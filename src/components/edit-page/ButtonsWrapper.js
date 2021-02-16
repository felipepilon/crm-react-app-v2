import { Box } from '@material-ui/core';
import React from 'react';

const ButtonsWrapper = ({children}) => {
    return (
        <Box display='flex' marginBottom={1}>
            {children}
        </Box>
    );
}
 
export default ButtonsWrapper;