import { TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import ColumnHeader from './ColumnHeader';

const TableHeader = ({columns}) => {
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((col) => {
                        return (
                            <ColumnHeader key={col.key} column={col}/>
                        );
                    })
                }
            </TableRow>
        </TableHead>
    );
}
 
export default TableHeader;