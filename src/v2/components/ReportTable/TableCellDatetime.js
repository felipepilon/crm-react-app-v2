import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

const TableCellDatetime = ({row, column}) => {
    const value = typeof column.value === 'function' ? column.value(row) :
        column.value || 
        row[column.key];

    if (!value)
        return '';

    return (  
        <Typography variant='inherit' noWrap>
            <FormattedDate value={value}/> <FormattedTime value={value}/>
        </Typography>
    );
}
 
export default TableCellDatetime;