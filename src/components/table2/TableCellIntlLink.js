import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link as LinkRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const TableCellIntlLink = ({value, to}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {
                    value &&
                    <Link color='primary' underline='always'
                        component={LinkRouter}
                        to={to}
                    >
                        <FormattedMessage id={value}/>
                    </Link>
                }
            </Typography>
        </TableCell>
    );
}
 
export default TableCellIntlLink;