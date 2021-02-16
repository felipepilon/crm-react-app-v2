import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const EnhancedTableCellEdit = (props) => {
    return (
        <TableCell align='center'>
            <IconButton size={props.dense ? 'small' : 'medium'}
                component={Link} to={() => props.column.to(props.row)}
            >
                <EditIcon/>
            </IconButton>
        </TableCell>
    );
}
 
export default EnhancedTableCellEdit;