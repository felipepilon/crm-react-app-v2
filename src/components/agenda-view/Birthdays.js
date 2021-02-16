import { CircularProgress } from '@material-ui/core';
import { formatISO } from 'date-fns';
import React, { useState } from 'react';
import { get_SumToDoBirthday, get_ToDoBirthday } from '../../services/Contact';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupCaption from './AgendaGroupCaption';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';

const getDateNoOffset = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
const getDateMonthDay = (date) => getDateNoOffset(date).toISOString().substr(5, 5);
const compareDate = (date1Str, date2) => date1Str === getDateMonthDay(date2);

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const Birthdays = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const yesterday_2 = new Date(new Date().setDate(today.getDate() - 2));
    const todays = contentData.filter((bth) => compareDate(bth.birthday, today)).sort(sortCustomers);
    const yesterdays = contentData.filter((bth) => compareDate(bth.birthday, yesterday)).sort(sortCustomers);
    const yesterdays_2 = contentData.filter((bth) => compareDate(bth.birthday, yesterday_2)).sort(sortCustomers);

    const handleLoadSummary = () => {
        setSummaryStatus('loading')
        get_SumToDoBirthday({
            birthday: formatISO(today).substr(5, 5),
            contact_date: formatISO(today).substr(0, 10)
        })
        .then((res) => {
            setSummaryData(res);
            setSummaryStatus('loaded');
        });
    }

    const handleLoadContent = () => {
        setContentStatus('loading')
        get_ToDoBirthday({
            birthday_start: formatISO(yesterday_2).substr(5, 5),
            birthday_end: formatISO(today).substr(5, 5),
            contact_date: formatISO(today).substr(0, 10)
        })
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    }

    return (
        <AgendaGroupAccordion 
            title='Birthdays' 
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
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Birthday'/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                yesterdays.length ?
                <AgendaGroupWrapper marginTop={1}>
                    <AgendaGroupCaption title='Yesterdays'/>
                    {
                        yesterdays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Birthday'/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                yesterdays_2.length ?
                <AgendaGroupWrapper marginTop={1}>
                    <AgendaGroupCaption title='Day Before Yesterdays'/>
                    {
                        yesterdays_2.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason_type='Birthday'/>
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
 
export default Birthdays;