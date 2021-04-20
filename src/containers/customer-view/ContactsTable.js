import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from '../../components/table/EnhancedTable'
import { FormattedMessage, useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { 
    get_Contacts,
    get_ContactInteractions,
} from '../../services/Contact';

const ContactsTable = (props) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ columns ] = useState([
        { name: 'contact_date', title: 'Contact Date', comp: 'datetime' },
        { name: 'store_name', title: 'Store' },
        { name: 'salesman_name', title: 'Salesman' },
        { name: 'reasons', title: 'Reason(s)', comp: 'intlSplit' },
        { name: 'another_reason', title: 'Another Reason' },
        { name: 'status', title: 'Status', comp: 'intl' },
    ]);
    const [ lastUpdate, setLastUpdate ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ colapsableColumns ] = useState([
        { name: 'interaction_text', title: 'Detalhes', wrap: true }
    ])

    const intl = useIntl();

    const handleChange = () => {
        setExpanded(!expanded);
    }

    const loadColapsableData = (refRow, setColapsableData) => {
        get_ContactInteractions({contact_id: refRow.contact_id})
        .then((result) => {
            const newColapsedData = result.map((res) => {
                return {
                    interaction_text: intl.formatMessage({id: res.interaction_text}, res)
                };
            })

            setColapsableData(newColapsedData);
        });
    }

    const loadData = () => {
        setLoading(true);
        
        setTimeout(() => {
            get_Contacts({
                customer_id: props.customer_id,
                limit: 10,
            })
            .then((result) => {
                setData(result);
                setLastUpdate(new Date());
                setLoading(false);
            });
        }, 500)
    }

    useEffect(() => {
        if (expanded && !lastUpdate)
            loadData();
    // eslint-disable-next-line
    }, [expanded]);

    useEffect(() => {
        if (props.lastUpdate && props.lastUpdate > lastUpdate)
            loadData();
    // eslint-disable-next-line
    }, [props.lastUpdate]);

    return (
        <Box
            width='100%'
        >
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography variant='subtitle1'><FormattedMessage id='Contacts'/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EnhancedTable
                        columns={columns}
                        data={data}
                        dense='dense disabled'
                        colapsableColumns={colapsableColumns}
                        loadColapsableData={loadColapsableData}
                        loading={loading}
                        paginationInvisible
                    />
                    
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ContactsTable;