import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_SumToDoDaysNoBuying, get_ToDoDaysNoBuying } from '../../services/Contact';
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

const Missing30Days = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const sortedData = contentData.sort(sortCustomers);

    const today = formatISO(new Date()).substr(0, 10);
    const todayMinus31 = formatISO(new Date(new Date().setDate(new Date().getDate() - 31))).substr(0, 10);
    
    const handleLoadSummary = () => {
        setSummaryStatus('loading')

        get_SumToDoDaysNoBuying({sale_date: todayMinus31, contact_data: today})
        .then((res) => {
            setSummaryData(res);
            setSummaryStatus('loaded');
        });
    }

    const handleLoadContent = () => {
        setContentStatus('loading')

        get_ToDoDaysNoBuying({sale_date: todayMinus31, contact_data: today})
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    }

    return (
        <AgendaGroupAccordion 
            title="30 Days no Buying" 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            loadSummaryFnc={handleLoadSummary}
            summaryData={summaryData}
            summaryStatus={summaryStatus}
        >
            {
                sortedData.length ?
                <AgendaGroupWrapper>
                    {
                        sortedData.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Missing'/>
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
 
export default Missing30Days;