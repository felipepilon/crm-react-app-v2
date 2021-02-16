import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';

const TableCellMasked = ({value, mask}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>{ 
                mask ?
                LabelMasks[mask](value) :
                value
            }</Typography>
        </TableCell>
    );
}
 
export default TableCellMasked;