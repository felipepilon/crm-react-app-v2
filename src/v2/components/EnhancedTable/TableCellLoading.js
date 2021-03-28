import React from 'react';
import { TableRow, TableCell, CircularProgress } from '@material-ui/core';

const TableCellLoading = ({columns, loading}) => {
    if (!loading)
        return null;
    
    return (
        <TableRow>
            <TableCell colSpan={columns.length + 1}>
                <CircularProgress size={20}/>
            </TableCell>
        </TableRow>
    );
}
 
export default TableCellLoading;