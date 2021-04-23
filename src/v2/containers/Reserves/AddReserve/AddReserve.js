import React, { useEffect, useContext, useState } from 'react';
import { Box, Stepper, Step, StepButton, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';
import {addDays, formatISO} from 'date-fns';
import { post_Reserve } from '../../../../services/Reserve';
import { AppStateContext } from '../../../contexts/AppState';
import ReserveCustomer from './ReserveCustomer';
import ReserveProduct from './ReserveProduct';
import ReserveCheckout from './ReserveCheckout';
import { WorkspaceContext } from '../../../contexts/Workspace';

const steps = ['customer', 'product', 'checkout']

const AddReserve = () => {
    const { setSucessSnack } = useContext(AppStateContext);
    const { store_group_code } = useContext(WorkspaceContext);
    
    const [ customer, setCustomer ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ completed, setCompleted ] = useState({});
    const [ store_code, setStoreCode ] = useState(null);
    const [ salesman_code, setSalesmanCode ] = useState(null);
    const [ reminder_date, setReminderDate ] = useState(addDays(new Date(), 7));
    // eslint-disable-next-line
    const [ errors, setErrors ] = useState({});

    const loc = useLocation();
    const hist = useHistory();

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
            ...{2: salesman_code && store_code ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesman_code, store_code]);

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
            store_code,
            customer_code: customer.customer_code,
            salesman_code,
            reserve_date: formatISO(new Date()),
            products: products.map((prod) => { 
                return {
                    product_code: prod.product.product_code,
                    product_color_code: prod.color.product_color_code,
                    size: prod.size,
                    quantity: prod.quantity,
                }
            }),
            reminders: [
                { reminder_date: formatISO(reminder_date).substr(0, 10) },
            ]
        };

        console.log('reserveData', reserveData)

        post_Reserve({store_group_code, params: reserveData})
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
                <ReserveCustomer step={0} activeStep={activeStep} customer={customer}
                    setCustomer={setCustomer}
                    handleNextStep={handleNextStep}
                />
                <ReserveProduct step={1} activeStep={activeStep} products={products}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    handleNextStep={handleNextStep}
                />
                <ReserveCheckout step={2} activeStep={activeStep}
                    store_code={store_code} handleStoreChange={setStoreCode}
                    salesman_code={salesman_code} handleSalesmanChange={setSalesmanCode}
                    reminder_date={reminder_date} handleReminderDateChange={setReminderDate}
                    disableSubmit={disableSubmit}
                    handleConfirmReserve={handleConfirmReserve}
                />
            </Box>
        </Container>
    );
}
 
export default AddReserve;