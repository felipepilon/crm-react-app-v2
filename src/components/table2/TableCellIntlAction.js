import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Link from '@material-ui/core/Link';

const TableCellIntlAction = ({value, handleClick}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {
                    value &&
                    <Link color='primary' href="#" underline='always' onClick={handleClick}>
                        <FormattedMessage id={value}/>
                    </Link>
                }
            </Typography>
        </TableCell>
    );
}
 
export default TableCellIntlAction;