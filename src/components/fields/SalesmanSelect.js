import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, useTheme, FormHelperText } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { get_Salespeople } from '../../services/Salesman';

const SalesmanSelect = (props) => {
    const [ options, setOptions ] = useState([]);
    const value = props.salesman_id;

    const theme = useTheme();

    useEffect(() => {
        if (props.store_id) {
            get_Salespeople({ store_id: props.store_id })
            .then((result) => {
                setOptions(result.map((opt) => {
                    return {
                        id: opt.salesman_id,
                        label: opt.name,
                    }
                }).sort((a, b) => a.label < b.label))
            })
        } else {
            setOptions([]);
        }
    }, [props.store_id]);

    useEffect(() => {
        props.handleSalesmanIdChange(options.length === 1 ? options[0].id : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return (
        <FormControl style={{marginTop: theme.spacing(2)}}
            error={props.error ? true : false}
        >
            <InputLabel id='salesman-select-label'><FormattedMessage id='Salesman'/></InputLabel>
            <Select
                labelId='salesman-select-label'
                id='salesman-select'
                displayEmpty
                fullWidth
                value={value || ''}
                onChange={(e) => props.handleSalesmanIdChange(e.target ? e.target.value : '')}
                disabled={props.disabled}
            >
                {
                    options.map((opt) => {
                        return (
                            <MenuItem key={opt.id}
                                value={opt.id}
                            >
                                {opt.label}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            {
                props.error ?
                <FormHelperText><FormattedMessage id={props.error}/></FormHelperText> :
                null
            }
        </FormControl>
    );
}
 
export default SalesmanSelect;