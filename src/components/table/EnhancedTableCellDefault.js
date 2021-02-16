import React from 'react';
import { TableCell, Typography } from '@material-ui/core';

const EnhancedTableCellDefault = (props) => {
    return (
        <TableCell>
            <Typography variant='inherit' 
                noWrap={!props.column.wrap} style={props.column.wrap ? {whiteSpace: 'pre-line'} : {}}
            >
                {props.row[props.column.name]}
            </Typography>
        </TableCell>
    );
}
 
export default EnhancedTableCellDefault;