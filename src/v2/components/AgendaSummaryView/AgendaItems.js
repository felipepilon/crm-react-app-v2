import { Box } from '@material-ui/core';
import React from 'react';
import Birthdays from './Birthdays';
import Reserves from './Reserves';
import TodaysSales from './TodaysSales';
import Missing30Days from './Missing30Days';

const AgendaItems = ({
    store_group_code, birthdays, reserves,
    todaysSales, missing30Days
}) => {
    return (
        <Box display='flex' flexDirection='column' width='50%'>
            <Birthdays store_group_code={store_group_code} summaryData={birthdays}/>
            <Reserves store_group_code={store_group_code} summaryData={reserves}/>
            <TodaysSales store_group_code={store_group_code} summaryData={todaysSales}/>
            <Missing30Days store_group_code={store_group_code} summaryData={missing30Days}/>
        </Box>
    );
}
 
export default AgendaItems;