import React from 'react';
import { Checkbox, TableCell } from '@material-ui/core';

const TableCellCheckbox = ({value}) => {
    return (
        <TableCell padding="checkbox">
            <Checkbox color='default' checked={value}/>
        </TableCell>
    );
}
 
export default TableCellCheckbox;