import React, { useState, useEffect } from 'react';
import { useTheme, fade, Box, TextField, Typography, Link } from '@material-ui/core';
import { Link as LinkRouter } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { get_CustomersIndex } from '../../services/Customer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LabelMasks from '../../utils/LabelMasks';

const minLength = 3;

const CustomerSearch = () => {
    const theme = useTheme();
    const intl = useIntl();

    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(open && inputValue.length >= minLength && !options.length);
        // eslint-disable-next-line
    }, [open, inputValue, options]);

    useEffect(() => {
        if (loading) {
            get_CustomersIndex({search_index: inputValue})
            .then((res) => setOptions(res));
        }
    // eslint-disable-next-line
    }, [loading]);

    useEffect(() => {
        if (!open || inputValue < minLength)
            setOptions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, inputValue]);
    
    return (
        <Box
            bgcolor={fade(theme.palette.common.white, 0.25)}
            borderRadius={theme.shape.borderRadius}
            width='20em'
        >
            <Autocomplete
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                inputValue={inputValue}
                onInputChange={(e, val) => setInputValue(val)}
                options={options}
                onBlur={() => setInputValue('')}
                loading={loading}
                loadingText={intl.formatMessage({ id: 'Loading customers' })}
                noOptionsText={intl.formatMessage({ id: 'Enter at least {minLength} digits to search for a customer' }, {minLength})}
                getOptionLabel={(opt) => opt.name}
                filterOptions={(opts, sta) => {
                    const fil = opts.filter((opt) => opt.search_index.includes(sta.inputValue.toUpperCase()));

                    // Suggest the creation of a new value
                    if (sta.inputValue.length > minLength) {
                        fil.push({
                            search_index: '_add',
                        });
                    };

                    return fil;
                }}
                renderOption={(opt) => {
                    if (opt.search_index === '_add') {
                        return <Box fontStyle='italic' >
                            <FormattedMessage id='New Customer'/>
                        </Box>
                    }
    
                    return (
                        <Link component={LinkRouter} to={`/workspace/customers/view/${opt.customer_id}`}>
                            <Typography variant='subtitle2'>
                                {opt.cpf ? LabelMasks.cpf(opt.cpf) : ''} {opt.name ? opt.name : ''}
                            </Typography>
                            <Typography variant='body2'>
                                {opt.email ? opt.email + ' ' : ''}
                                {opt.phone1 ? LabelMasks.phone(opt.phone1) + ' ' : ''}
                                {opt.phone2 ? LabelMasks.phone(opt.phone2) + ' ' : ''}
                            </Typography>
                        </Link>
                    )
                }}
                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        label={intl.formatMessage({ id: 'Customer' })}
                    />
                }
            />
        </Box>
    );
}
 
export default CustomerSearch;