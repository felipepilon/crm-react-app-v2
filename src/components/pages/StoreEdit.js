import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import EnhancedEditForm from '../edit/EnhancedEditForm';
import { 
    get_Store,
    post_Store,
} from '../../services/Store';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';

const StoreEdit = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [ data, setData ] = useState();
    const [ errors, setErrors ] = useState({});

    const intl = useIntl();
    const hist = useHistory();
    const loc = useLocation();

    const handleCancel = () => {
        hist.goBack();
    };

    const handleReset = () => {
        findRecord();
    };

    const handleConfirm = () => {
        post_Store(data)
        .then((dat) => {
            setSucessSnack('Store updated successfully')
            
            if (loc.state.from || loc.state.from.pathname)
                hist.push(loc.state.from.pathname);
        })
        .catch((err) => {
            console.log('err =>', err)
            setErrors(err);
        })
    }

    const findRecord = () => {
        get_Store(props.storeId)
        .then((result) => {
            setData(result);
        })
    };

    const [ fields ] = useState({
        groups: [
            {
                fields: [
                    { name: 'cnpj', title: 'CNPJ', type: 'label', mask:'cnpj' },
                    { name: 'name', title: 'Name' },
                ],
            },
            {
                title: 'Address',
                fields: [
                    { name: 'zip', title: 'ZIP' },
                    { name: 'city', title: 'City' },
                    { name: 'addr1', title: 'Address 1' },
                    { name: 'addr2', title: 'Address 2' },
                    { name: 'phone1', title: 'Phone 1', mask:'phone' },
                    { name: 'phone2', title: 'Phone 2', mask:'phone' },
                ],
            }, 
        ]
    });

    const handleFieldChange = (name, value) => {
        const updData = { ...data }

        if (
            name === 'cnpj' ||
            name === 'phone1' ||
            name === 'phone2' 
        )
        {
            value = value.replace(/(\D)+/g,'');
        }

        updData[name] = value;
        setData(updData);
    };
    
    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Edit Store' });
        findRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            display='flex'
            maxWidth='100%'
            justifyContent='center'
            padding={3}
        >
            <Box
                maxWidth='450px'
            >
                <EnhancedEditForm
                    title='Edit Store'
                    fields={fields}
                    data={data}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                    handleCancel={hist.length > 1 ? handleCancel : null}
                    handleReset={handleReset}
                    handleConfirm={handleConfirm}
                />
            </Box>
        </Box>
    )
};

export default StoreEdit;