import React from 'react';
import { TableRow, TableCell, Collapse } from '@material-ui/core';
import ColapsableTable from './ColapsableTable';

const ColapsableTableRow = (props) => {
    return (
        <TableRow>
            <TableCell
                colSpan={props.colSpan}
            >
                <Collapse in={props.open} timeout='auto' unmountOnExit>
                    <ColapsableTable
                        columns={props.columns}
                        refRow={props.refRow}
                        loadColapsableData={props.loadColapsableData}
                        dense={props.dense}
                    />
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
 
export default ColapsableTableRow;