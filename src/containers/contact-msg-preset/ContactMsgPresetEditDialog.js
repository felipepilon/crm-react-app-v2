import React, { useContext, useEffect, useState } from 'react';
import { post_ContactMsgPreset, get_ContactMsgPreset } from '../../services/ContactMsgPreset';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_ContactReasons } from '../../services/ContactReason';

const ContactReasonAddDialog = ({handleUpdated, open, handleClose, contact_reason_id, contact_msg_preset_id}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        get_ContactMsgPreset({contact_msg_preset_id})
        .then((res) => {
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 500);
        })
    }, [contact_msg_preset_id]);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_ContactMsgPreset({contact_msg_preset_id})
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

        post_ContactMsgPreset(data)
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
        <EditDialogWrapper title='New Contact Reason' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='contact_reason_id' title='Reason' value={data.contact_reason_id} error={errors.contact_reason_id} handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_ContactReasons}
                    loadOptionsParams={{contact_reason_id}}
                    optionLabel='reason_description'
                    readOnly
                />
                <PageField fieldKey='contact_via' title='Contact Via' value={data.contact_via} error={errors.contact_via} handleChange={handleFieldChange}
                    comp='select'
                    options={['WhatsApp']}
                    readOnly
                />
                <PageField fieldKey='msg_preset' title='Description' value={data.msg_preset} error={errors.msg_preset} handleChange={handleFieldChange}/>
                <PageField fieldKey='text' title='Text' value={data.text} error={errors.text} handleChange={handleFieldChange} comp='multiline'/>
                <PageField fieldKey='is_default' title='Default' value={data.is_default} error={errors.is_default} handleChange={handleFieldChange} comp='checkbox'/>
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

export default ContactReasonAddDialog;