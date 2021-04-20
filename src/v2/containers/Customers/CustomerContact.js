import { Box, Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ContactCenter from '../../components/ContactCenter';
import CustomerDataPaper from '../../components/CustomerDataPaper';
import CustomerReservesAccordion from '../../components/CustomerReservesAccordion';
import { get_Customer } from '../../../services/Customer';
import { AppStateContext } from '../../contexts/AppState';
import ContactTopics from '../../components/ContactTopics';
import CustomerContactsAccordion from '../../components/CustomerContactsAccordion/CustomerContactsAccordion';


const loadingStatus = 'Loading customer';

const CustomerContact = () => {
    const { addStatus, removeStatus } = useContext(AppStateContext);

    const { store_group_code, customer_code } = useRouteMatch().params;

    const [ customer, setCustomer ] = useState({customer_code});
    const [ contactsLastUpdate, setContactsLastUpdate ] = useState();
    const [ reservesLastUpdate, setReservesLastUpdated ] = useState();

    useEffect(() => {
        handleLoadCustomer();
    // eslint-disable-next-line
    }, [store_group_code, customer_code]);

    const handleLoadCustomer = () => {
        addStatus(loadingStatus);

        setTimeout(() => {
            get_Customer({store_group_code, customer_code})
            .then((res) => {
                setCustomer(res);
                removeStatus(loadingStatus);
            })
            .catch((err) => {
                console.error('Error getting customer', err);
                removeStatus(loadingStatus);
            });
        }, 500);
    }

    return (
        <Container>
            <Box display='flex' justifyContent='center' padding={1}>
                <Typography variant='h5'>
                    { customer.name }
                </Typography>
            </Box>
            <Box display='flex'>
                <CustomerDataPaper customer={customer} handleLoadCustomer={handleLoadCustomer}/>
                <ContactCenter store_group_code={store_group_code} customer={customer}
                    setContactsLastUpdate={setContactsLastUpdate}
                />
            </Box>
            <ContactTopics store_group_code={store_group_code} customer={customer} 
                reservesLastUpdate={reservesLastUpdate} setReservesLastUpdated={setReservesLastUpdated} 
                contactsLastUpdate={contactsLastUpdate}
            />
            <CustomerReservesAccordion customer={customer} lastUpdate={reservesLastUpdate}/>
            <CustomerContactsAccordion customer={customer} lastUpdate={contactsLastUpdate}/>
        </Container>
    );
}
 
export default CustomerContact;