import React, { useContext, useEffect, useState } from 'react';
import { post_ConnUser } from '../../services/ConnUser';
import { get_ConnJobProfiles } from '../../services/ConnJobProfiles';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_Users, get_ConnUser } from '../../services/User';

const ConnUserConfigDialog = ({user_id, handleUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        sync_frequency: 60,
        connection_string: 'Server=.;Database=LINXPOS;User Id=sa;Password=;',
        diagnostic: false
    });

    useEffect(() => {
        get_ConnUser({user_id})
        .then((res) => {
            if (res) {
                setData(res);
            } 
            
            setErrors({});
            setLoading(false);
        })
    }, [user_id]);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        get_ConnUser({user_id})
        .then((res) => {
            if (res && res.length) {
                setData(res[0]);
            }
            setErrors({});
            setLoading(false);
        })
    }

    const handleConfirm = () => {
        setLoading(true);

        post_ConnUser(data)
        .then(() => {
            setSucessSnack('Record updated successfully');
            if (handleUpdated)
                handleUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='Connector Configurations' loading={loading} open={open} handleClose={handleClose}>
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
                    defaultValue={user_id}
                    readOnly
                />
                <PageField fieldKey='c_job_profile_id' title='Job Profile' value={data.c_job_profile_id} error={errors.c_job_profile_id} handleChange={handleFieldChange}
                    comp='select' loadOptionsFnc={get_ConnJobProfiles} optionLabel='profile_name'
                />
                <PageField fieldKey='sync_frequency' title='Sync Frequency (in seconds)' value={data.sync_frequency} error={errors.sync_frequency} handleChange={handleFieldChange}/>
                <PageField fieldKey='connection_string' title='Connection String' value={data.connection_string} error={errors.connection_string} handleChange={handleFieldChange} comp='multiline'/>
                <PageField fieldKey='diagnostic' title='Diagnostic' value={data.diagnostic} error={errors.diagnostic} handleChange={handleFieldChange} comp='checkbox'/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default ConnUserConfigDialog;