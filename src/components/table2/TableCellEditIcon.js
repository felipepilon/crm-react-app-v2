import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const TableCellEditIcon = ({dense, handleClick}) => {
    return (
        <TableCell align='center'>
            <IconButton size={dense ? 'small' : 'medium'} onClick={handleClick}>
                <EditIcon/>
            </IconButton>
        </TableCell>
    );
}
 
export default TableCellEditIcon;