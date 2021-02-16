import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const TableCellIntl = ({value, intlPrefix}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {
                    value &&
                    <FormattedMessage id={(intlPrefix || '') + value}/>
                }
            </Typography>
        </TableCell>
    );
}
 
export default TableCellIntl;