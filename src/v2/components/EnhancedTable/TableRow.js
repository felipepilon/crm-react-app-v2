import React from 'react';
import { TableRow as TableRowMUI } from '@material-ui/core'
import TableCell from './TableCell';
import ColapsableTableRow from './ColapsableTableRow';
import { Fragment } from 'react';

const TableRow = ({row, columns, colapsableColumns, colapsableData, dense}) => {
    console.log('colapsableData', colapsableData);

    const { _row_id } = row;

    return (
        <Fragment>
            <TableRowMUI>{
                    columns.map((col) => {
                        if (col.comp === 'colapsable' && typeof colapsableData[_row_id] === 'object') {
                            col.value = colapsableData[_row_id]
                        }
                        
                        return (
                            <TableCell key={col.key} row={row} column={col}/>
                            )
                        })
            }</TableRowMUI>
            {
                colapsableData[_row_id] &&
                <ColapsableTableRow
                    colSpan={columns.length + 1}
                    open={colapsableData[_row_id].open}
                    dense={dense}
                    columns={colapsableColumns}
                    parentRow={row}
                    data={colapsableData[_row_id].data}
                />
            }
        </Fragment>
    );
}
 
export default TableRow;