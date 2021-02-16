import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, useTheme, FormHelperText } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { get_StoreSalespeople } from '../../../services/Store';

const SalesmanSelect = ({store_group_code, store_code, salesman_code, handleSalesmanIdChange, error, disabled}) => {
    const [ options, setOptions ] = useState([]);
    const value = salesman_code;

    const theme = useTheme();
    
    useEffect(() => {
        if (store_group_code && store_code) {
            get_StoreSalespeople({store_group_code, store_code, params: {
                active: true
            }})
            .then((result) => {
                setOptions(result.map((opt) => {
                    return {
                        value: opt.salesman_code,
                        label: opt.name,
                    }
                }).sort((a, b) => a.label < b.label))
            })
        } else {
            setOptions([]);
        }
    // eslint-disable-next-line
    }, [store_group_code, store_code]);

    useEffect(() => {
        handleSalesmanIdChange(options.length === 1 ? options[0].value : null);
    // eslint-disable-next-line
    }, [options]);

    return (
        <FormControl style={{marginTop: theme.spacing(2)}}
            error={Boolean(error)}
        >
            <InputLabel id='salesman-select-label'><FormattedMessage id='Salesman'/></InputLabel>
            <Select
                labelId='salesman-select-label'
                id='salesman-select'
                displayEmpty
                fullWidth
                value={value || ''}
                onChange={(e) => handleSalesmanIdChange(e.target ? e.target.value : '')}
                disabled={disabled}
            >
                {
                    options.map((opt) => {
                        return (
                            <MenuItem key={opt.value}
                                value={opt.value}
                            >
                                {opt.label}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            {
                error &&
                <FormHelperText><FormattedMessage id={error}/></FormHelperText>
            }
        </FormControl>
    );
}
 
export default SalesmanSelect;