import { Box } from '@material-ui/core';
import React from 'react';

const WorkspaceWrapper = ({children}) => {
    return (
        <Box display='flex' flexDirection='column' minHeight='0' height='100%'>
            {children}
        </Box>
    );
}
 
export default WorkspaceWrapper;