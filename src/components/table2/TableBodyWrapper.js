import { Box, Table } from '@material-ui/core';
import React from 'react';

const TableBodyWrapper = ({dense, children}) => {
    return (
        <Box overflow='auto' flex='1'>
            <Table size={dense && dense.includes('dense') ? 'small' : 'medium'} stickyHeader>
                {children}
            </Table>
        </Box>
    );
}
 
export default TableBodyWrapper;