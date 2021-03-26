import { Typography } from '@material-ui/core';
import React from 'react';

const TableCellText = ({row, column}) => {
    const value = typeof column.value === 'function' ? column.value(row) :
        column.value ? column.value :
        typeof row[column.key] === 'number' ? row[column.key] :
        typeof row[column.key] ? row[column.key] : '';

    return (  
        <Typography variant='inherit' noWrap>
            {value}
        </Typography>
    );
}
 
export default TableCellText;