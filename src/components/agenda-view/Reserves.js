import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_SumToDoReserve, get_ToDoReserve } from '../../services/Contact';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupCaption from './AgendaGroupCaption';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';
import formatISO from 'date-fns/formatISO';

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const Reserves = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const todays = contentData.sort(sortCustomers);

    const reminder_date = formatISO(new Date()).substr(0, 10);
    
    const handleLoadSummary = () => {
        setSummaryStatus('loading')
        get_SumToDoReserve({reminder_date})
        .then((res) => {
            setSummaryData(res);
            setSummaryStatus('loaded');
        });
    }

    const handleLoadContent = () => {
        setContentStatus('loading')
        get_ToDoReserve({reminder_date})
        .then((res) => {

            setContentData(res);
            setContentStatus('loaded');
        });
    }

    return (
        <AgendaGroupAccordion 
            title='Reserves' 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            loadSummaryFnc={handleLoadSummary}
            summaryData={summaryData}
            summaryStatus={summaryStatus}
        >
            {
                todays.length ?
                <AgendaGroupWrapper>
                    <AgendaGroupCaption title='Todays'/>
                    {
                        todays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Reserve' reminder_date={reminder_date}/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                contentStatus === 'loading' &&
                <CircularProgress size={20}/>
            }
        </AgendaGroupAccordion>
    );
}
 
export default Reserves;