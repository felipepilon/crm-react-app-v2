import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';
import formatISO from 'date-fns/formatISO';
import { get_AgendaMissing } from '../../../services/Agenda';
import { useIntl } from 'react-intl';

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const Missing30Days = ({store_group_code, summaryData}) => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);

    const intl = useIntl();
    
    const sortedData = contentData.sort(sortCustomers);

    const today = new Date();
    const todayMinus31 = new Date(today.setDate(today.getDate() - 31));
    
    const handleLoadContent = () => {
        setContentStatus('loading')

        get_AgendaMissing({store_group_code, params: {
            date: formatISO(today).substr(0, 10),
            sale_date: formatISO(todayMinus31).substr(0, 10)
        }})
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    };

    if (!summaryData)
        return null;

    return (
        <AgendaGroupAccordion 
            title="30 Days no Buying - {sale_date}"
            titleValues={{sale_date: intl.formatDate(todayMinus31)}} 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            summaryData={summaryData}
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