import { Box } from '@material-ui/core';
import React from 'react';

const ListPageWrapper = (props) => {
    return (
        <Box display='flex' flexDirection='column' minHeight='0' height='100%'>
            {props.children}
        </Box>
    );
}
 
export default ListPageWrapper;