import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedDate, FormattedTime } from 'react-intl';

const TableCellDatetime = ({value}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                <FormattedDate value={value}/> <FormattedTime value={value}/>
            </Typography>
        </TableCell>
    );
}
 
export default TableCellDatetime;