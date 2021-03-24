import { InputAdornment, MenuItem, OutlinedInput, Select, useTheme } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

const SearchFieldTextLike = ({field, values, handleFieldChange}) => {
    const theme = useTheme();
                                     
    let { value, likeSuffix } = values[field.key] || {};

    const _handleFieldChange = (newValue, newLikeSuffix) => {
        handleFieldChange(field.key, {
            value: newValue,
            likeSuffix: newLikeSuffix
        });
    }

    useEffect(() => {
        if (typeof value === 'undefined' || typeof likeSuffix === 'undefined')
            _handleFieldChange(value || '', likeSuffix || '%');
    // eslint-disable-next-line
    }, [value, likeSuffix]);

    return (
        <Fragment>
            <OutlinedInput
                value={value || ''} 
                onChange={(e) => _handleFieldChange(e.target.value || '', likeSuffix)} 
                fullWidth
                startAdornment={
                    <InputAdornment>
                        <Select value={typeof likeSuffix === 'undefined' ? '%' : likeSuffix}
                            onChange={(e) => _handleFieldChange(value, e.target.value)} 
                            style={{marginRight: theme.spacing(1)}} displayEmpty
                        >
                            <MenuItem value='%' ><FormattedMessage id='Starts With'/></MenuItem>
                            <MenuItem value=''><FormattedMessage id='Exact Value'/></MenuItem>
                        </Select>
                    </InputAdornment>
                }
            />
        </Fragment>
    );
}
 
export default SearchFieldTextLike;