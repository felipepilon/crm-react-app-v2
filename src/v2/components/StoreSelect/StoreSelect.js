import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, useTheme, FormHelperText } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { get_Stores } from '../../../services/Store';

const StoreSelect = ({store_group_code, store_code, handleChange, error, disabled}) => {
    const [ options, setOptions ] = useState([]);
    const value = store_code;

    const theme = useTheme();

    useEffect(() => {
        get_Stores({store_group_code})
        .then(result => {
            setOptions(result.map((opt) => {
                return {
                    value: opt.store_code,
                    label: opt.name,
                }
            }).sort((a, b) => a.label < b.label))
        });
    // eslint-disable-next-line
    }, [store_group_code]);

    useEffect(() => {
        handleChange(options.length === 1 ? options[0].value : null);
    // eslint-disable-next-line
    }, [options]);

    return (
        <FormControl style={{marginTop: theme.spacing(2)}}
            error={Boolean(error)}
        >
            <InputLabel  id='store-select-label'><FormattedMessage id='Store'/></InputLabel>
            <Select
                labelId='store-select-label'
                id="demo-simple-select-outlined"
                value={value || ''}
                onChange={(e) => handleChange(e.target ? e.target.value : '')}
                disabled={disabled}
            >
                {
                    options.length !== 1 ?
                    <MenuItem value=''>
                        <em><FormattedMessage id='Select'/></em>
                    </MenuItem> :
                    null
                }
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
 
export default StoreSelect;