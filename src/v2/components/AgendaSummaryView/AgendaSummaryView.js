import { formatISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { get_AgendaSummary } from '../../../services/Agenda';
import { AppStateContext } from '../../contexts/AppState';
import { WorkspaceContext } from '../../contexts/Workspace';
import { Paper, useTheme } from '@material-ui/core';
import AgendaItems from './AgendaItems';
import AgendaChart from './AgendaChart';

const loadingStatus = 'Loading Agenda';

const AgendaSummaryView = () => {
    const { addStatus, removeStatus, setError } = useContext(AppStateContext);
    const { store_group_code } = useContext(WorkspaceContext);

    const theme = useTheme();

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
        <Paper style={{flex: '1', display: 'flex', padding: theme.spacing(1)}}>
            <AgendaItems store_group_code={store_group_code}
                birthdays={birthdays} reserves={reserves}
                todaysSales={todaysSales} missing30Days={missing30Days}
            />
            <AgendaChart 
                birthdays={birthdays} reserves={reserves}
                todaysSales={todaysSales} missing30Days={missing30Days}
            />
        </Paper>
    );
}
 
export default AgendaSummaryView;