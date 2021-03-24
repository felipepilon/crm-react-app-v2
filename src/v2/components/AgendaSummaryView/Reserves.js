import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupCaption from './AgendaGroupCaption';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';
import formatISO from 'date-fns/formatISO';
import { get_AgendaReserves } from '../../../services/Agenda';

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const Reserves = ({store_group_code, summaryData}) => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    
    const todays = contentData.sort(sortCustomers);

    const reminder_date = formatISO(new Date()).substr(0, 10);
    
    const handleLoadContent = () => {
        setContentStatus('loading')
        get_AgendaReserves({store_group_code, params: {reminder_date}})
        .then((res) => {

            setContentData(res);
            setContentStatus('loaded');
        });
    }

    if (!summaryData)
        return null;

    return (
        <AgendaGroupAccordion 
            title='Reserves' 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent}
            summaryData={summaryData}
        >
            {
                todays.length ?
                <AgendaGroupWrapper>
                    <AgendaGroupCaption title='Todays'/>
                    {
                        todays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_code} customer={cus} reason_type='Reserve' reminder_date={reminder_date}/>
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