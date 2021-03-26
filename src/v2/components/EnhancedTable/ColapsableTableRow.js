import React from 'react';
import { TableRow, TableCell, Collapse } from '@material-ui/core';

const ColapsableTableRow = ({colSpan, open, columns, dense, data, parentRow}) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    Teste Colapsable
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
 
export default ColapsableTableRow;