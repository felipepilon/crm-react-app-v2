import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { IconButton } from '@material-ui/core';

const TableCellIcon = ({row, column}) => {
    const Icon = column.icon || HelpIcon;

    return (
        <IconButton onClick={() => column.click(row)} size='small'>
            <Icon/>
        </IconButton>
    );
}
 
export default TableCellIcon;