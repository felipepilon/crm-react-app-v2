import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const TableCellIntl = ({row, column}) => {
    let value = typeof column.value === 'function' ? column.value(row) :
        column.value || 
        row[column.key];

    if (column.intlPrefix)
        value = column.intlPrefix + value;

    return (  
        <Typography variant='inherit' noWrap>
            {(value && <FormattedMessage id={value}/>) || ''}
        </Typography>
    );
}
 
export default TableCellIntl;