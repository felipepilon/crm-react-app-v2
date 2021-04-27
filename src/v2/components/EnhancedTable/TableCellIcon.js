import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { IconButton, Tooltip } from '@material-ui/core';
import { useIntl } from 'react-intl';

const TableCellIcon = ({row, column}) => {
    const Icon = column.icon || HelpIcon;
    const tipText = column.tipText;

    const intl = useIntl();

    if (!tipText)
        return (
            <IconButton onClick={() => column.click(row)} size='small'>
                <Icon/>
            </IconButton>
        );
    else
        return (
            <Tooltip title={intl.formatMessage({ id: tipText })}>
                <IconButton onClick={() => column.click(row)} size='small'>
                    <Icon/>
                </IconButton>
            </Tooltip>
        );
}
 
export default TableCellIcon;