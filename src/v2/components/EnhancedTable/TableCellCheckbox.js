import { Checkbox } from '@material-ui/core';
import React from 'react';

const TableCellCheckbox = ({row, column}) => {
    const checked = Boolean(row[column.key] || false);

    return (
        <Checkbox color='default' checked={checked}/>
    );
}
 
export default TableCellCheckbox;