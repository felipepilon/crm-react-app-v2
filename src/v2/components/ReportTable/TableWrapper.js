import { Box, Table } from '@material-ui/core';
import React from 'react';

const TableWrapper = ({children, dense}) => {
    return (
        <Box display='flex' flexDirection='column' width='100%' overflow='auto' flex='1'>
            <Table size={dense ? 'small' : 'medium'} stickyHeader>
                {children}
            </Table>
        </Box>
    );
}
 
export default TableWrapper;