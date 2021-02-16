import React from 'react';
import StoreSelect from '../fields/StoreSelect';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const SalesPanelFilters = (props) => {
    const handleStoreIdChange = (value) => {
        const { store_id, ...newFilters } = props.filters;
        if (value)
            newFilters.store_id = value;
        props.setFilters(newFilters);
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<FilterListIcon/>}/>
            <AccordionDetails>
                <StoreSelect
                    store_id={props.filters.store_id}
                    handleStoreIdChange={handleStoreIdChange}
                />
            </AccordionDetails>
        </Accordion>
    );
}
 
export default SalesPanelFilters;