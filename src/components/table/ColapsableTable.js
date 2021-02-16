import React, { useState, useEffect } from 'react';
import EnhancedTable from './EnhancedTable';

const ColapsableTable = (props) => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        props.loadColapsableData(props.refRow, setData)
    // eslint-disable-next-line
    }, [])

    return (
        <EnhancedTable
            columns={props.columns}
            data={data}
            dense={props.dense}
            dataStatus={data ? 'loaded' : 'loading'}
            paginationInvisible
            rowsPerPage={9999}
        />
    );
}
 
export default ColapsableTable;