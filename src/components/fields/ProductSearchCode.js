import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress, Typography, useTheme } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get_Products } from '../../services/Product';
import AutocompleteV2 from '../../v2/components/Autocomplete/Autocomplete';

const minLength = 2;

const ProductSearchCode = ({productCode, handleProductSelect, setProductCode, store_group_id}) => {
    const [ open, setOpen ] = useState(false);
    const [ options, setOptions ] = useState([]);
    
    const theme = useTheme();

    const loading = open && !options.length && productCode.length >= minLength;

    const handleChange = (e, selOpt) => {
        if (selOpt && selOpt.product_id)
            handleProductSelect(selOpt);
    }
    
    const handleInputChange = (e, newValue) => {
        setProductCode(newValue);
    }

    useEffect(() => {
        if (!loading)
            return undefined;

        get_Products({store_group_id, params: {
            search_index: `${productCode}%`
        }})
        .then(result => {
            setOptions(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (!open || productCode < minLength)
            setOptions([]);
    }, [open, productCode])

    return (
        <Fragment>
            <AutocompleteV2 valueField='product_code'
                labelOptionField={(({opt}) => {
                    return (
                        <Typography variant='body1'>{`${opt.product_code} - ${opt.product_desc}`}</Typography>
                    );
                })}
                getOptionsFnc={get_Products}
                getOptionsParams={{store_group_id, params: {limit: 10}}}
                getOptionsField='search_index'
                minLength='2'
                handleChange={handleProductSelect}
            />
            <Autocomplete
                style={{ width: '100%', marginTop: theme.spacing(1) }}
                options={options}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => opt.product_code}
                renderOption={(opt) => {
                    return (
                        <Fragment>
                            <Typography variant='body2'>
                                {opt.product_code} - {opt.product_desc}
                            </Typography>
                        </Fragment>
                    )
                }}
                noOptionsText={false}
                onChange={handleChange}
                inputValue={productCode}
                onInputChange={handleInputChange}
                selectOnFocus
                clearOnBlur={false}
                handleHomeEndKeys
                renderInput={(params) => 
                    <TextField 
                        { ...params } 
                        label='Product Code'
                        variant='outlined'
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress size={20}/> : null}
                                </Fragment>
                            ),
                        }}
                    />
                }
            />
        </Fragment>
    )
}
 
export default ProductSearchCode;