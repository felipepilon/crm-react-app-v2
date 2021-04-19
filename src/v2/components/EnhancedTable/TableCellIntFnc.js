import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const TableCellIntlFnc = ({row, column}) => {
    let value = typeof column.value === 'function' ? column.value(row) :
        column.value || 
        row[column.key];

    if (column.intlPrefix)
        value = column.intlPrefix + value;

    if (column.intlPrefix)
        value = column.intlPrefix + value;

    const handleClick = () => {
        if (typeof column.fnc === 'function')
            column.fnc(row);
    }

    return (  
        <Typography variant='inherit' noWrap>
        {
            value &&
            <Button variant='outlined' size='small' onClick={handleClick}>
                <FormattedMessage id={value}/>
            </Button>
        }
    </Typography>
    );
}
 
export default TableCellIntlFnc;