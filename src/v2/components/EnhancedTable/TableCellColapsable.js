import React from 'react';
import { IconButton } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const TableCellIcon = ({row, column}) => {
    const open = Boolean(column.value && column.value.open);

    const Icon = open ? KeyboardArrowUpIcon : KeyboardArrowRight;

    return (
        <IconButton onClick={() => column.click({open: !open, row})} size='small'>
            <Icon/>
        </IconButton>
    );
}
 
export default TableCellIcon;