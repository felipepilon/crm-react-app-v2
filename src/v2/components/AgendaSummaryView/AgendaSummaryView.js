import { formatISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { get_AgendaSummary } from '../../../services/Agenda';
import { AppStateContext } from '../../contexts/AppState';
import { WorkspaceContext } from '../../contexts/Workspace';
import AgendaWrapper from './AgendaWrapper';
import Birthdays from './Birthdays';
import Reserves from './Reserves';
import TodaysSales from './TodaysSales';
import Missing30Days from './Missing30Days';

const loadingStatus = 'Loading Agenda';

const AgendaSummaryView = () => {
    const { addStatus, removeStatus, setError } = useContext(AppStateContext);
    const { store_group_code } = useContext(WorkspaceContext);

    const [data, setData] = useState([]);
    
    useEffect(() => {
        addStatus(loadingStatus);

        get_AgendaSummary({store_group_code, date: formatISO(new Date()).substr(0, 10)})
        .then((res) => {
            setData(res);
            removeStatus(loadingStatus);
        })
        .catch((err) => {
            setError(err);
            removeStatus(loadingStatus);
        })
    // eslint-disable-next-line
    }, [store_group_code]);

    const birthdays = data.find((itm) => itm.agenda_item_id === 'Birthdays');
    const reserves = data.find((itm) => itm.agenda_item_id === 'Reserves');
    const todaysSales = data.find((itm) => itm.agenda_item_id === 'TodaysSales');
    const missing30Days = data.find((itm) => itm.agenda_item_id === 'Missing30Days');

    return (
        <AgendaWrapper>
            <Birthdays store_group_code={store_group_code} summaryData={birthdays}/>
            <Reserves store_group_code={store_group_code} summaryData={reserves}/>
            <TodaysSales store_group_code={store_group_code} summaryData={todaysSales}/>
            <Missing30Days store_group_code={store_group_code} summaryData={missing30Days}/>
        </AgendaWrapper>
    );
}
 
export default AgendaSummaryView;