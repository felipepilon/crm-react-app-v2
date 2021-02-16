import React, { useContext, useEffect, useState } from 'react';
import { 
    get_User,
    post_User,
} from '../../services/User';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';

const UserEditDialog = ({user_id, handleUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        get_User({user_id})
        .then((res) => {
            setData(res);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }, [user_id]);

    const handleFieldChange = (fieldKey, newValue) => setData((prevData) => ({...prevData, [fieldKey]: newValue}));

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_User({user_id})
        .then((res) => {
            setData(res);
            setErrors({});
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }

    const handleConfirm = () => {
        setLoading(true);

        post_User(data)
        .then(() => {
            setSucessSnack('Record updated successfully');
            handleUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='Edit User' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='first_name' title='First Name' value={data.first_name} error={errors.first_name} handleChange={handleFieldChange}/>
                <PageField fieldKey='last_name' title='Last Name' value={data.last_name} error={errors.last_name} handleChange={handleFieldChange}/>
                <PageField fieldKey='email' title='Email' value={data.email} error={errors.email} handleChange={handleFieldChange}/>
                <PageField fieldKey='role' title='Role' value={data.role} error={errors.role} handleChange={handleFieldChange} 
                    comp='select' hideSelectOption intlPrefix='user.role.'
                    options={['connector', 'admin', 'manager', 'salesman']}
                />
                <PageField fieldKey='password' title='Password' value={data.password} error={errors.password} handleChange={handleFieldChange}/>
                <PageField fieldKey='password_confirm' title='Confirm Password' value={data.password_confirm} error={errors.password_confirm} handleChange={handleFieldChange}/>
                <PageField fieldKey='force_password_change' title='Force Password Change' value={data.force_password_change} error={errors.force_password_change} handleChange={handleFieldChange} comp='checkbox'/>
                <PageField fieldKey='active' title='Active' value={data.active} error={errors.active} handleChange={handleFieldChange} comp='checkbox'/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default UserEditDialog;