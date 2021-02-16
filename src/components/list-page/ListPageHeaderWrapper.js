import { Box } from '@material-ui/core';
import React from 'react';

const ListPageHeaderWrapper = (props) => {
    return (
        <Box display='flex' padding={2}>
            {props.children}
        </Box>
    );
}
 
export default ListPageHeaderWrapper;