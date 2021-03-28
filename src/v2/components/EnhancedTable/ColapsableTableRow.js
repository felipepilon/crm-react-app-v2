import React, { useState } from 'react';
import { TableRow, TableCell, Collapse } from '@material-ui/core';
import EnhancedTable from './EnhancedTable';

const ColapsableTableRow = ({columns, row, colapsable, dense}) => {
    const { columns: colapsableColumns, getDataFnc, getDataParams, hideRowNo } = colapsable || {};
    const { open } = colapsable.rows[row._row_id] || {};

    const [ data, setData ] = useState([]);
    const [ filters ] = useState((getDataParams || []).reduce((prev, key) => ({...prev, [key]: row[key]}), {}));

    return (
        <TableRow>
            <TableCell colSpan={columns.length}>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <EnhancedTable 
                        data={data} setData={setData}
                        columns={colapsableColumns} 
                        getDataFnc={getDataFnc} 
                        hideRowNo={hideRowNo}
                        filters={filters}
                        dense={dense} hideDense
                        rowsPerPage={data.length + 1} 
                        hidePagination
                    />
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
 
export default ColapsableTableRow;