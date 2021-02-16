import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedTableCellIntl = (props) => {
    const value = props.row[props.column.name] || props.column.value || '';

    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {
                    value &&
                    <FormattedMessage id={value}/>
                }
            </Typography>
        </TableCell>
    );
}
 
export default EnhancedTableCellIntl;