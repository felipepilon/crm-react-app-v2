import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import EnhancedTable from '../EnhancedTable';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { get_ReserveProducts } from '../../../services/ReserveProduct';
import { FormattedMessage } from 'react-intl';

const CustomerReservesAccordion = ({customer, lastUpdate}) => {
    const [data, setData] = useState([]);
    const [filters] = useState({ 
        customer_code: customer.customer_code,
        _limit: 30,
        _orderBy: ['reserve_date DESC, product_code, product_color_code, size']
    });
    const [ expanded, setExpanded ] = useState(false);
    const [ lastLoadedAt, setLastLoadedAt ] = useState(null);
    
    const columns = [
        { key: 'reserve_date', title: 'Reserve Date', comp: 'datetime' },
        { key: 'status', title: 'Status', comp: 'intl' },
        { key: 'product_code', title: 'Product' },
        { key: 'product_desc', title: 'Description' },
        { key: 'product_color_code', title: 'Color' },
        { key: 'size', title: 'Size' },
        { key: 'quantity', title: 'Quantity' },
        { key: 'store_name', title: 'Store' },
        { key: 'salesman_name', title: 'Salesman' },
        { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
        { key: 'updated_by', title: 'Updated By' }
    ];

    useEffect(() => {
        if (expanded && !lastLoadedAt)
            setLastLoadedAt(new Date());
    // eslint-disable-next-line
    }, [expanded, lastLoadedAt]);

    useEffect(() => {
        if (expanded)
            setLastLoadedAt(new Date());
    // eslint-disable-next-line
    }, [lastUpdate]);

    const noLoadData = !Boolean(lastLoadedAt);

    return (
        <Box flex='1' margin={1}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography variant='subtitle1'><FormattedMessage id='Reserves'/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EnhancedTable
                        columns={columns} 
                        defaultDense hideDense
                        hidePaginationSinglePage rowsPerPageDefault={5}
                        loadingStatus='Loading reserves'
                        data={data} setData={setData} noLoadData={noLoadData}
                        getDataFnc={get_ReserveProducts}
                        filters={filters} noSaveFilter
                        lastUpdate={lastLoadedAt}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
 
export default CustomerReservesAccordion;