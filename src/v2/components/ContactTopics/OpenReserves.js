import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { get_ReserveProducts } from '../../../services/ReserveProduct';
import EnhancedTable from '../EnhancedTable';

const columns = [
    { key: 'reserve_date', title: 'Reserve Date', comp: 'datetime' },
    { key: 'product_code', title: 'Product' },
    { key: 'product_desc', title: 'Description' },
    { key: 'product_color_code', title: 'Color' },
    { key: 'size', title: 'Size' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'store_name', title: 'Store' },
    { key: 'salesman_name', title: 'Salesman' }
]

const OpenReserves = ({customer, lastUpdate}) => {
    const [data, setData] = useState([]);
    const [filters] = useState({ 
        customer_code: customer.customer_code, 
        _limit: 5, 
        _orderBy: ['reserve_date'] 
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(
            data.length ? 'Open reserves' :
            'No open reserves'
        );
    }, [data.length])

    return (
        <Box display='flex' flexDirection='column' marginTop={1} maxHeight='250px' overflow='auto'>
            {
                message &&
                <Typography variant='body1'><FormattedMessage id={message}/></Typography>
            }
            <EnhancedTable columns={columns} 
                defaultDense hideDense hidePagination hideNoData
                loadingStatus='Loading Open Reserves'
                data={data} setData={setData}
                getDataFnc={get_ReserveProducts}
                filters={filters}
                lastUpdate={lastUpdate}
            />
        </Box>
    );
}
 
export default OpenReserves;