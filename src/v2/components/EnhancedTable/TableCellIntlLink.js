import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const TableCellIntlLink = ({row, column}) => {
    const loc = useLocation();

    let value = typeof column.value === 'function' ? column.value(row) :
        column.value || 
        row[column.key];

    if (column.intlPrefix)
        value = column.intlPrefix + value;

    let to = typeof column.to === 'function' ? column.to(row) : column.to;

    if (column.intlPrefix)
        value = column.intlPrefix + value;

    return (  
        <Typography variant='inherit' noWrap>
        {
            value &&
            <Link color='primary' underline='always'
                component={LinkRouter}
                to={{
                    pathname: to,
                    state: { from: loc }
                }}
            >
                <FormattedMessage id={value}/>
            </Link>
        }
    </Typography>
    );
}
 
export default TableCellIntlLink;