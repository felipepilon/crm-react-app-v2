import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedDate } from 'react-intl';

const TableCellDate = ({value}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                <FormattedDate value={value}/>
            </Typography>
        </TableCell>
    );
}
 
export default TableCellDate;