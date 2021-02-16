import React, { useContext, useEffect, useState } from 'react';
import { 
    get_Customer,
    post_Customer,
} from '../../services/Customer';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';

const CustomerEditDialog = ({customer_id, handleCustomerUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        get_Customer({customer_id})
        .then((res) => {
            setCustomer(res);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }, [customer_id]);

    const handleFieldChange = (fieldKey, newValue) => setCustomer({...customer, ...{[fieldKey]: newValue}});

    const handleFieldChangeNumber = (fieldKey, newValue) => {
        if (newValue)
            newValue = newValue.replace(/[^0-9]/g, "");

        setCustomer({...customer, ...{[fieldKey]: newValue}})
    }

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_Customer({customer_id})
        .then((res) => {
            setCustomer(res);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }

    const handleConfirm = () => {
        setLoading(true);

        post_Customer(customer)
        .then(() => {
            setSucessSnack('Record updated successfully');
            handleCustomerUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='Edit Customer' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='name' title='Name' value={customer.name} error={errors.name} handleChange={handleFieldChange}/>
                <PageField fieldKey='cpf' title='CPF' value={customer.cpf} error={errors.cpf} handleChange={handleFieldChangeNumber} comp='masked' mask='cpf'/>
                <PageField fieldKey='birth_date' title='Date of Birth' value={customer.birth_date} error={errors.birth_date} handleChange={handleFieldChange} comp='date'/>
            </FieldGroupWrapper>
            <FieldGroupWrapper title='Contact Data'>
                <PageField fieldKey='email' title='Email' value={customer.email} error={errors.email} handleChange={handleFieldChange}/>
                <PageField fieldKey='phone1' title='Phone 1' value={customer.phone1} error={errors.phone1} handleChange={handleFieldChangeNumber} comp='masked' mask='phone'/>
                <PageField fieldKey='phone2' title='Phone 2' value={customer.phone2} error={errors.phone2} handleChange={handleFieldChangeNumber} comp='masked' mask='phone'/>
            </FieldGroupWrapper>
            <FieldGroupWrapper title='Address'>
                <PageField fieldKey='zip' title='ZIP' value={customer.zip} error={errors.zip} handleChange={handleFieldChange}/>
                <PageField fieldKey='city' title='City' value={customer.city} error={errors.city} handleChange={handleFieldChange}/>
                <PageField fieldKey='addr1' title='Address 1' value={customer.addr1} error={errors.addr1} handleChange={handleFieldChange}/>
                <PageField fieldKey='addr2' title='Address 2' value={customer.addr2} error={errors.addr2} handleChange={handleFieldChange}/>
                <PageField fieldKey='state' title='State' value={customer.state} error={errors.state} handleChange={handleFieldChange}/>
            </FieldGroupWrapper>
            <FieldGroupWrapper title='Notifications'>
                <PageField fieldKey='allow_crm_contact' title='Allow CRM Contact' value={customer.allow_crm_contact} error={errors.allow_crm_contact} handleChange={handleFieldChange} comp='checkbox'/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default CustomerEditDialog;