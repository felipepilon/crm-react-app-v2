import React from 'react';
import { TableCell as TableCellMUI } from '@material-ui/core';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellText from './TableCellText';
import TableCellDatetime from './TableCellDatetime';
import TableCellIcon from './TableCellIcon';
import TableCellIntl from './TableCellIntl';
import TableCellIntlLink from './TableCellIntlLink';
import TableCellIntFnc from './TableCellIntFnc';
import TableCellColapsable from './TableCellColapsable';

const comps = {
    default: TableCellText,
    checkbox: TableCellCheckbox,
    datetime: TableCellDatetime,
    icon: TableCellIcon,
    intl: TableCellIntl,
    intlLink: TableCellIntlLink,
    intlFnc: TableCellIntFnc,
    colapsable: TableCellColapsable
}

const TableCell = ({row, column}) => {
    const comp = column.comp || 'default';

    const Comp = comps[comp] || comps.default;

    const align = ['checkbox', 'icon'].includes(comp) ? 'center' : 'left'

    return (
        <TableCellMUI align={align} padding={comp === 'checkbox' ? 'checkbox' : 'default'}>
            <Comp row={row} column={column}/>
        </TableCellMUI>
    );
}
 
export default TableCell;