import { TableRow } from '@material-ui/core';
import React from 'react';

const RowWrapper = ({children}) => {
    return (
        <TableRow>
            {children}
        </TableRow>
    );
}
 
export default RowWrapper;