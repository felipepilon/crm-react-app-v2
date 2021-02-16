import React, { useContext, useEffect, useState } from 'react';
import { 
    get_StoreGroup,
    post_StoreGroup,
} from '../../services/StoreGroup';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';

const StoreGroupEditDialog = ({store_group_id, handleUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        get_StoreGroup({store_group_id})
        .then((res) => {
            setData(res);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }, [store_group_id]);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_StoreGroup({store_group_id})
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

        post_StoreGroup(data)
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
        <EditDialogWrapper title='Edit Store Group' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='name' title='Name' value={data.name} error={errors.name} handleChange={handleFieldChange}/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default StoreGroupEditDialog;