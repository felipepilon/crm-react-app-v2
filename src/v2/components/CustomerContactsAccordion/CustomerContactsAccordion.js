import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import EnhancedTable from '../EnhancedTable';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import { get_Contacts } from '../../../services/Contact';

const CustomerContactsAccordion = ({customer, lastUpdate}) => {
    const [data, setData] = useState([]);
    const [filters] = useState({ 
        customer_code: customer.customer_code,
        _limit: 30,
        _orderBy: ['contact_date DESC']
    });
    const [ expanded, setExpanded ] = useState(false);
    const [ lastLoadedAt, setLastLoadedAt ] = useState(null);

    const [ columns ] = useState([
        { key: 'contact_date', title: 'Contact Date', comp: 'datetime' },
        { key: 'store_name', title: 'Store' },
        { key: 'salesman_name', title: 'Salesman' },
        { key: 'reasons', title: 'Reasons' },
        { key: 'another_reason', title: 'Another Reason' },
        { key: 'status', title: 'Status', comp: 'intl' },
        { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
        { key: 'updated_by', title: 'Updated By' }
    ]);

    const [ colapsableColumns ] = useState([
        { name: 'interaction_text', title: 'Detalhes', wrap: true }
    ])
    

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
                    <Typography variant='subtitle1'><FormattedMessage id='Contacts'/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EnhancedTable
                        columns={columns} 
                        defaultDense hideDense
                        hidePaginationSinglePage rowsPerPageDefault={5}
                        loadingStatus='Loading contacts'
                        data={data} setData={setData} noLoadData={noLoadData}
                        getDataFnc={get_Contacts}
                        filters={filters} noSaveFilter
                        lastUpdate={lastLoadedAt}
                        colapsableColumns={colapsableColumns}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
 
export default CustomerContactsAccordion;