import React from 'react';
import { TableRow as TableRowMUI } from '@material-ui/core'
import TableCell from './TableCell';

const TableRow = ({row, columns}) => {
    return (
        <TableRowMUI>
            {
                columns.map((col) => {
                    return (
                        <TableCell key={col.key} row={row} column={col}/>
                    )
                })
            }
        </TableRowMUI>
    );
}
 
export default TableRow;