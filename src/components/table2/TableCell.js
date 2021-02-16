import React from 'react';
import TableCellEditIcon from './TableCellEditIcon';
import TableCellDefault from './TableCellDefault';
import TableCellIntl from './TableCellIntl';
import TableCellIntlSplit from './TableCellIntlSplit';
import TableCellIntlLink from './TableCellIntlLink';
import TableCellDatetime from './TableCellDatetime';
import TableCellDate from './TableCellDate';
import TableCellMasked from './TableCellMasked';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellIntlAction from './TableCellIntlAction';
import TableCellIcon from './TableCellIcon';

const components = {
    default: TableCellDefault,
    masked: TableCellMasked,
    date: TableCellDate,
    datetime: TableCellDatetime,
    editIcon: TableCellEditIcon,
    intlSplit: TableCellIntlSplit,
    intl: TableCellIntl,
    intlLink: TableCellIntlLink,
    checkbox: TableCellCheckbox,
    intlAction: TableCellIntlAction,
    icon: TableCellIcon
}

const TableCell = ({format, ...other}) => {
    const Component = components[format || 'default'] || TableCellDefault;

    return (
        <Component {...other}/>
    )
}
 
export default TableCell;