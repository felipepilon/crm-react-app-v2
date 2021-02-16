import React, { useState } from 'react';
import { Paper, useTheme } from '@material-ui/core';
import SalesPanelIndicators from './SalesPanelIndicators';
import SalesPanelFilters from './SalesPanelFilters';

const SalesPanel = () => {
    const theme = useTheme();
    const [filters, setFilters] = useState({});

    return (
        <Paper
            style={{
                display: 'flex',
                position: 'relative',
                padding: theme.spacing(1),
                marginLeft: theme.spacing(1),
                boxSizing: 'border-box',
                flex: '1',
                flexDirection: 'column'
            }}
        >
            <SalesPanelFilters
                filters={filters}
                setFilters={setFilters}
            />
            <SalesPanelIndicators
                filters={filters}
            />
        </Paper>
    );
}
 
export default SalesPanel;