import React, { useEffect, useContext, useState } from 'react';
import { WorkspaceStateContext } from '../../contexts/WorkspaceState';
import { Box, Stepper, Step, StepButton, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomer from '../reserve/ReserveCustomer';
import ReserveProduct from '../reserve/ReserveProduct';
import ReserveCheckout from '../reserve/ReserveCheckout';
import { post_Reserve } from '../../services/Reserve';
import { useLocation, useHistory } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppState';
import {addDays, formatISO} from 'date-fns';

const steps = ['customer', 'product', 'checkout']

const ReserveAdd = () => {
    const { setStatus } = useContext(WorkspaceStateContext);
    const { setSucessSnack } = useContext(AppStateContext);

    const [ customer, setCustomer ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ completed, setCompleted ] = useState({});
    const [ store_id, handleStoreIdChange ] = useState(null);
    const [ salesman_id, handleSalesmanIdChange ] = useState(null);
    const [ reminderDate, setReminderDate ] = useState(addDays(new Date(), 7));
    // eslint-disable-next-line
    const [ errors, setErrors ] = useState({});

    const loc = useLocation();
    const hist = useHistory();

    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStep = (step) => () => {
        setActiveStep(step);
    }

    const handleNextStep = () => {
        if (activeStep < steps.length)
            setActiveStep(activeStep + 1);
    }

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{0: customer.customer_id ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer]);

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{1: products.length ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{2: salesman_id && store_id ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesman_id, store_id]);

    const handleAddProduct = (newProduct) => {
        setProducts([
            ...products,
            newProduct,
        ])
    };

    const handleRemoveProduct = (prodIndex) => {
        setProducts(products.filter((p, i) => i !== prodIndex));
    }

    const handleConfirmReserve = () => {
        const reserveData = {
            store_group_id: customer.store_group_id,
            store_id,
            customer_id: customer.customer_id,
            salesman_id,
            reserve_date: formatISO(new Date()),
            products: products.map((prod) => { 
                return {
                    product_id: prod.product.product_id,
                    product_color_id: prod.color.product_color_id,
                    size: prod.size,
                    quantity: prod.quantity,
                }
            }),
            reminders: [
                { reminder_date: formatISO(reminderDate).substr(0, 10) },
            ]
        };

        console.log('reserveData', reserveData)

        post_Reserve(reserveData)
        .then(() => {
            setSucessSnack('Reserve added successfully')
            
            if (loc.state.from || loc.state.from.pathname)
                hist.push(loc.state.from.pathname);
        })
        .catch((err) => {
            console.log('err =>', err)
            setErrors(err);
        })
    }

    const disableCheckout = !completed[0] || !completed[1] ? true : false
    const disableSubmit = !completed[0] || !completed[1] || !completed[2] ? true : false
    
    return (
        <Container>
            <Stepper nonLinear activeStep={activeStep}>
                <Step>
                    <StepButton onClick={handleStep(0)} completed={completed[0]}>
                        <FormattedMessage id='Customer'/>
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={handleStep(1)} completed={completed[1]}>
                        <FormattedMessage id='Products'/>
                    </StepButton>
                </Step>
                <Step disabled={disableCheckout}>
                    <StepButton onClick={handleStep(1)} completed={completed[2]}>
                        <FormattedMessage id='Checkout'/>
                    </StepButton>
                </Step>
            </Stepper>
            <Box
                display='flex'
            >
                <ReserveCustomer
                    step={0}
                    activeStep={activeStep}
                    customer={customer}
                    setCustomer={setCustomer}
                    handleNextStep={handleNextStep}
                />
                <ReserveProduct
                    step={1}
                    activeStep={activeStep}
                    products={products}
                    store_group_id={customer && customer.store_group_id}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    handleNextStep={handleNextStep}
                />
                <ReserveCheckout
                    step={2}
                    activeStep={activeStep}
                    store_id={store_id}
                    salesman_id={salesman_id}
                    handleStoreIdChange={handleStoreIdChange}
                    handleSalesmanIdChange={handleSalesmanIdChange}
                    reminderDate={reminderDate}
                    setReminderDate={setReminderDate}
                    disableSubmit={disableSubmit}
                    handleConfirmReserve={handleConfirmReserve}
                />
            </Box>
        </Container>
    );
}
 
export default ReserveAdd;