import { TableBody } from '@material-ui/core';
import React from 'react';

const RowsWrapper = ({children}) => {
    return (
        <TableBody>
            {children}
        </TableBody>
    );
}
 
export default RowsWrapper;