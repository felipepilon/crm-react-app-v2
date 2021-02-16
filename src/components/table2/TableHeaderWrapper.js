import { TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const TableHeaderWrapper = ({children}) => {
    return (
        <TableHead>
            <TableRow>
                {children}
            </TableRow>
        </TableHead>
    );
}
 
export default TableHeaderWrapper;