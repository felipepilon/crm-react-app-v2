import { Box } from '@material-ui/core';
import React from 'react';

const TableWrapper = ({children}) => {
    return (
        <Box display='flex' flexDirection='column' height='100%' minHeight='0'>
            {children}
        </Box>
    );
}
 
export default TableWrapper;