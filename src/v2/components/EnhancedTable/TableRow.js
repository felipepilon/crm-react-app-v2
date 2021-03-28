import React from 'react';
import { TableRow as TableRowMUI } from '@material-ui/core'
import TableCell from './TableCell';
import ColapsableTableRow from './ColapsableTableRow';
import { Fragment } from 'react';

const TableRow = ({row, columns, colapsable, dense}) => {
    const { _row_id } = row;

    const colapsableRow = colapsable.rows[_row_id] || {};

    return (
        <Fragment>
            <TableRowMUI>{
                columns.map((col) => {
                    if (col.comp === 'colapsable') {
                        col.value = colapsableRow;
                    }
                    
                    return (
                        <TableCell key={col.key} row={row} column={col}/>
                    )
                })
            }</TableRowMUI>
            {
                colapsableRow.open &&
                <ColapsableTableRow columns={columns} row={row}colapsable={colapsable}/>
            }
        </Fragment>
    );
}
 
export default TableRow;