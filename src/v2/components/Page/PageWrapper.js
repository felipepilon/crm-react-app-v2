import { Box } from '@material-ui/core';
import React from 'react';

const PageWrapper = ({children}) => {
    return (
        <Box display='flex' flexDirection='column' margin={2} overflow='auto' flex='1'>
            {children}
        </Box>
    );
}
 
export default PageWrapper;