import React, { useContext, useEffect, useState } from 'react';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_Users } from '../../services/User';
import { get_StoreGroups } from '../../services/StoreGroup';
import { get_UserStoreGroup, post_UserStoreGroup } from '../../services/UserStoreGroup';

const UserStoreEditDialog = ({user_store_group_id, user_id, handleUpdated, open, handleClose, store_group_id, user_id_ReadOnly}) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({user_id, store_group_id});

    useEffect(() => {
        get_UserStoreGroup({user_store_group_id})
        .then((res) => {
            setData(res);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }, [user_store_group_id]);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_UserStoreGroup({user_store_group_id})
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

        post_UserStoreGroup(data)
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
        <EditDialogWrapper title='Edit User Store Group' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField 
                    fieldKey='user_id'
                    title='User'
                    value={data.user_id}
                    error={errors.user_id} 
                    handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_Users}
                    loadOptionsParams={{user_id}}
                    optionLabel='name'
                    readOnly={user_id_ReadOnly}
                    hideSelectOption
                />
                <PageField 
                    fieldKey='store_group_id'
                    title='Store Group'
                    value={data.store_group_id}
                    error={errors.store_group_id} 
                    handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_StoreGroups}
                    loadOptionsParams={{exact_or_unassigned_to: user_id, store_group_id}}
                    optionLabel='name'
                    hideSelectOption
                />
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default UserStoreEditDialog;