import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

const EnhancedTableCellIntl = (props) => {
    const intl = useIntl();

    let value = props.row[props.column.name] || props.column.value || '';

    const values = value.split(', ');

    if (values.length === 1) {
        value = intl.formatMessage({id: values[0]})
    } else if (values.length) {
        value = value.split(', ').reduce((c, v) => {
            return `${c}${intl.formatMessage({id: `${v}`})}, `;
        }, '');
        value = value.slice(0, -2);
    }

    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {value}
            </Typography>
        </TableCell>
    );
}
 
export default EnhancedTableCellIntl;