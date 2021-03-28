import React from 'react';
import TableRow from './TableRow';
import { TableBody as TableBodyMUI } from '@material-ui/core';
import TableCellLoading from './TableCellLoading';

const TableBody = ({
    data, rowsPerPage, page, columns, loading,
    colapsable, dense
}) => {
    const _data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    return (
        <TableBodyMUI>
            <TableCellLoading columns={columns} loading={loading}/>
            {
                _data.map((row, idx) => {
                    const _row = { ...row, _row_id: idx + page, _row_no: idx + page + 1 };
                    
                    return (
                        <TableRow key={idx} row={_row} 
                            columns={columns} dense={dense}
                            colapsable={colapsable}
                        />
                    );
                })
            }
        </TableBodyMUI>
    );
}
 
export default TableBody;