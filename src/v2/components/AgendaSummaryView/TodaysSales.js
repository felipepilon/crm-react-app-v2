import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_AgendaSales } from '../../../services/Agenda';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';
import formatISO from 'date-fns/formatISO';
import { useIntl } from 'react-intl';

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const TodaysSales = ({store_group_code, summaryData}) => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);

    const intl = useIntl();
    
    const todays = contentData.sort(sortCustomers);

    const today = new Date();
    
    const handleLoadContent = () => {
        setContentStatus('loading')

        get_AgendaSales({store_group_code, params: {
            sale_date: formatISO(today).substr(0, 10)
        }})
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    }

    if (!summaryData)
        return null;

    return (
        <AgendaGroupAccordion 
            title="Today's Sales - {sale_date}"
            titleValues={{sale_date: intl.formatDate(today)}} 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            summaryData={summaryData}
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