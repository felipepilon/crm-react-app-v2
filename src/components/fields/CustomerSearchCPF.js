import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FieldInputMask from './FieldInputMask';
import { customers as getCustomersApi } from '../../services/Customer';
import LabelMask from '../../utils/LabelMasks';

const mask = 'cpf';
const minLength = 3

const CustomerSearchCPF = (props) => {
    const [ inputValue, setInputValue ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ options, setOptions ] = useState([]);

    const loading = open && !options.length && inputValue.length >= minLength;

    const handleChange = (e, selOpt) => {
        if (selOpt && selOpt.customer_id)
            props.handleCustomerSelect(selOpt);
    }

    const handleInputChange = (e, newValue) => {
        newValue = newValue.replace(/(\D)+/g,'');
        setInputValue(newValue);
    }

    useEffect(() => {
        if (!loading)
            return undefined;

        getCustomersApi({ cpf: `${inputValue}%` })
        .then(result => {
            setOptions(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (!open || inputValue < minLength)
            setOptions([]);
    }, [open, inputValue])

    return (
        <Autocomplete
            style={{ width: '100%' }}
            options={options}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            getOptionLabel={(opt) => opt.cpf}
            renderOption={(opt) => {
                return (
                    <Fragment>
                        <Typography variant='body1'>
                            {LabelMask.cpf(opt.cpf)} - {opt.name}
                        </Typography>
                        <Typography variant='body2'>
                            {opt.addr1} {opt.addr2} {opt.addr3} {opt.city} {opt.state}
                        </Typography>
                    </Fragment>
                )
            }}
            noOptionsText={false}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            selectOnFocus
            clearOnBlur={false}
            handleHomeEndKeys
            renderInput={(params) => 
                <TextField 
                    { ...params } 
                    label='CPF'
                    variant='outlined'
                    size='small'
                    InputProps={{
                        ...params.InputProps,
                        inputComponent: (mask ? FieldInputMask[mask] : undefined),
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress size={20}/> : null}
                            </Fragment>
                        ),
                    }}
                />
            }
        />
    )
}
 
export default CustomerSearchCPF;