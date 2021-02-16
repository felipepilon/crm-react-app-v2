import React from 'react';
import { TableCell, Typography } from '@material-ui/core';

const TableCellDefault = ({value, wrap}) => {
    return (
        <TableCell>
            <Typography variant='inherit' 
                noWrap={!wrap} style={wrap ? {whiteSpace: 'pre-line'} : {}}
            >
                {value}
            </Typography>
        </TableCell>
    );
}
 
export default TableCellDefault;