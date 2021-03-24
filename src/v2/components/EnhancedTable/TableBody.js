import React from 'react';
import TableRow from './TableRow';
import { TableBody as TableBodyMUI } from '@material-ui/core';

const TableBody = ({data, rowsPerPage, page, columns}) => {
    const _data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    return (
        <TableBodyMUI>
            {
                _data.map((row, idx) => {
                    return (
                        <TableRow key={idx} row={row} columns={columns}/>
                    );
                })
            }
        </TableBodyMUI>
    );
}
 
export default TableBody;