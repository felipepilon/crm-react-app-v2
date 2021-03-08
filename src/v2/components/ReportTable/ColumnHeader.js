import { TableCell, TableSortLabel, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ColumnHeader = ({column}) => {
    const align = ['checkbox', 'icon'].includes(column.comp) ? 'center' :
        (column.align || 'left');

    return (
        <TableCell align={align}>
            <TableSortLabel>
                <Typography variant='inherit' noWrap>
                    {
                        column.title ?
                        <FormattedMessage id={column.title}/> :
                        ''
                    }
                </Typography>
            </TableSortLabel>
        </TableCell>
    );
}
 
export default ColumnHeader;