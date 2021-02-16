import React from 'react';
import { TableCell, TableSortLabel, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedTableHeadCell = (props) => {
    return (
        <TableCell align={props.column.comp && props.column.comp.includes('Icon') ? 'center' : 'left'}>
            <TableSortLabel>
                <Typography variant='inherit' noWrap>
                    {
                        props.column.title ?
                        <FormattedMessage id={props.column.title}/> :
                        ''
                    }
                </Typography>
            </TableSortLabel>
        </TableCell>
    );
}
 
export default EnhancedTableHeadCell;