import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_SumToDoSale, get_ToDoSale } from '../../services/Contact';
import AgendaGroupAccordion from './AgendaGroupAccordion';
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

const TodaysSales = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const todays = contentData.sort(sortCustomers);
    
    const today = formatISO(new Date()).substr(0, 10);

    const handleLoadSummary = () => {
        setSummaryStatus('loading')

        get_SumToDoSale({sale_date: today, contact_data: today})
        .then((res) => {
            setSummaryData(res);
            setSummaryStatus('loaded');
        });
    }

    const handleLoadContent = () => {
        setContentStatus('loading')

        get_ToDoSale({sale_date: today, contact_data: today})
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    }

    return (
        <AgendaGroupAccordion 
            title="Today's Sales" 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            loadSummaryFnc={handleLoadSummary}
            summaryData={summaryData}
            summaryStatus={summaryStatus}
        >
            {
                todays.length ?
                <AgendaGroupWrapper>
                    {
                        todays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Thanks'/>
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
 
export default TodaysSales;