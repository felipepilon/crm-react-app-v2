import { Box, Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ContactCenter from '../ContactCenter';
import CustomerDataPaper from '../../../containers/customer-view/CustomerDataPaper';
import { get_Customer } from '../../../services/Customer';
import { AppStateContext } from '../../contexts/AppState';
import NotFound from '../NotFound';
import ContactTopics from '../../components/ContactTopics';

const loadingStatus = 'Loading customer';

const CustomerContact = () => {
    const { addStatus, removeStatus } = useContext(AppStateContext);

    const { store_group_code, customer_code } = useRouteMatch().params;

    const [ customer, setCustomer ] = useState();
    const [ loading, setLoading ] = useState(true);
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
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error getting customer', err);
                removeStatus(loadingStatus);
                setLoading(false);
            });
        }, 500);
    }

    if (!customer)
        return !loading ? <NotFound/> : null;

    return (
        <Container>
            <Box display='flex' justifyContent='center' padding={1}>
                <Typography variant='h5'>
                    { customer.name }
                </Typography>
            </Box>
            <Box display='flex'>
                <Box width='30%' padding={1}>
                    <CustomerDataPaper customer={customer} handleLoadCustomer={handleLoadCustomer}/>
                </Box>
                <Box flex='1' padding={1} >
                    <ContactCenter store_group_code={store_group_code} customer={customer}
                        setContactsLastUpdate={setContactsLastUpdate}
                    />
                </Box>
            </Box>
            <Box flex='1' padding={1}>
                <ContactTopics store_group_code={store_group_code} customer={customer} 
                    reservesLastUpdate={reservesLastUpdate} setReservesLastUpdated={setReservesLastUpdated} 
                    contactsLastUpdate={contactsLastUpdate}
                />
            </Box>
        </Container>
    );
}
 
export default CustomerContact;