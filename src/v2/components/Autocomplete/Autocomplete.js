import { CircularProgress, InputAdornment, TextField, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Fragment } from 'react';
import AutoCompletePopper from './AutoCompletePopper';
import { useIntl } from 'react-intl';

const keyAction = (e, value) => {
    const { key, shiftKey } = e;

    let action;

    if (key === 'ArrowDown' || (!shiftKey && key === 'Tab'))
        action = {down: true};
    else if (key === 'ArrowUp' || (shiftKey && key === 'Tab'))
        action = {up: true};
    else if (key === 'Home')
        action = {top: true}
    else if (key === 'End')
        action = {botton: true}
    else if (key === 'Enter')
        action = {select: value}
    
    if (action)
        e.preventDefault();

    return action || {};
}

const Autocomplete = ({
    minLength, getOptionsFnc, valueField, labelField,
    labelOptionField, getOptionsParams, getOptionsField,
    handleSelect, inputLabel, filterField, selected
}) => {
    const theme = useTheme();
    const intl = useIntl();

    const _minLength = minLength || 3;

    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [_selected, _setSelected] = useState({value: '', label: ''});
    const [lastSearchLabel, setLastSearchLabel] = useState('');
    const [lastSelectedValue, setLastSelectedValue] = useState('');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [highlightIndex, setHighligtIndex] = useState(-1);

    const handleOptionChange = ({down, up, top, botton, index, select}) => {
        if (!open || !options.length) {
            setHighligtIndex(-1);
            return;
        }

        if (typeof index === 'number') 
            setHighligtIndex((prevIdx) => index >= 0 && index <= (options.length - 1) ? index : prevIdx);
        else if (down) 
            setHighligtIndex((prevIdx) => prevIdx + (prevIdx < (options.length - 1) ? 1 : 0));
        else if (up)
            setHighligtIndex((prevIdx) => prevIdx - (prevIdx > 0 ? 1 : 0));
        else if (top)
            setHighligtIndex(() => 0);
        else if (botton)
            setHighligtIndex(() => options.length - 1);
        else if (select)
            setSelectedValue(select);
    }

    const setSelectedValue = (newSelVal) => {
        _setSelected(newSelVal);
        setLastSelectedValue(newSelVal.value);
        handleClose();

        if (handleSelect && newSelVal.raw)
            handleSelect(newSelVal.raw);
    }

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
        setOptions([]);
    }
    
    const handleSelectedValueChange = (e) => {
        const value = e.target.value;
        _setSelected(() => ({value, label: value}));
        if (value !== lastSelectedValue)
            setLastSelectedValue('')
    }
    
    const handleRefreshOptions = (force) => {
        if (_selected.label.length >= _minLength && lastSelectedValue !== _selected.value) {
            if (force || (!filteredOptions.length && _selected.label !== lastSearchLabel)) {
                setLoading(true);

                const getOptionsValue = `%${_selected.value}%`;

                let _getOptionsParams = getOptionsParams ? {
                        ...getOptionsParams,
                        params: {...getOptionsParams.params, [getOptionsField]: getOptionsValue}
                    } :
                    {params: {[getOptionsField]: getOptionsValue}};
                
                getOptionsFnc(_getOptionsParams)
                .then((res) => {
                    const newOpt = res.map((opt) => {
                        const _valueField = valueField || 'value';
                        const _filterField = filterField || _valueField;
                        const _labelField = labelField || (opt.hasOwnProperty('label') ? 'label' : _valueField);
                        const _labelOptionField = labelOptionField || (opt.hasOwnProperty('labelOption') ? 'labelOption' : _labelField);
                        
                        return {
                            value: typeof _valueField === 'function' ? _valueField({opt}) : opt[_valueField],
                            filter: typeof _filterField === 'function' ? _filterField({opt}) : opt[_filterField],
                            label: typeof _labelField === 'function' ? _labelField({opt}) : opt[_labelField],
                            optionLabel: typeof _labelOptionField === 'function' ? _labelOptionField({opt}) : opt[_labelOptionField],
                            raw: opt
                        }
                    });

                    setOptions(newOpt);
                    setOpen(true);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error getting options', err);
                    handleClose();
                });
            }
        } else {
            handleClose();
        }

        setLastSearchLabel(_selected.label);
    }

    useEffect(() => {
        handleRefreshOptions();
    // eslint-disable-next-line
    }, [_selected.label]);

    useEffect(() => {
        if (!selected) {
            _setSelected({value: '', label: ''})
        } else {
            const _valueField = valueField || 'value';
            const _filterField = filterField || _valueField;
            const _labelField = labelField || (selected.hasOwnProperty('label') ? 'label' : _valueField);
            const _labelOptionField = labelOptionField || (selected.hasOwnProperty('labelOption') ? 'labelOption' : _labelField);

            const _value = (typeof _valueField === 'function' ? _valueField({selected}) : selected[_valueField]) || '';
            
            if (_value !== _selected.value) {
                _setSelected(
                    _value ?
                    {
                        value: typeof _valueField === 'function' ? _valueField({selected}) : selected[_valueField],
                        filter: typeof _filterField === 'function' ? _filterField({selected}) : selected[_filterField],
                        label: typeof _labelField === 'function' ? _labelField({selected}) : selected[_labelField],
                        optionLabel: typeof _labelOptionField === 'function' ? _labelOptionField({selected}) : selected[_labelOptionField],
                        raw: selected
                    } :
                    {value: '', label: ''}
                );
            }
        }
    // eslint-disable-next-line
    }, [selected])

    useEffect(() => {
        if (options.length) {
            const newFilOpt = options.filter((opt) => opt.filter.toUpperCase().includes(_selected.label.toUpperCase()));

            if (_selected.label !== lastSearchLabel)
                handleRefreshOptions(true);
            else 
                setFilteredOptions(newFilOpt);
        }
        else if (filteredOptions.length) {
            setFilteredOptions([]);
        }
    // eslint-disable-next-line
    }, [_selected.label, options]);
    
    let listOptions = []
    
    if (open) {
        listOptions = [...filteredOptions];

        if (open && !listOptions.length) {
            listOptions.push({value: '_nothing', label: 'No records found', optionLabel: 'No records found', intl: true});
        }
    }

    return (
        <Fragment>
            <TextField label={inputLabel && intl.formatMessage({id: inputLabel})} fullWidth
                value={_selected.label} onChange={handleSelectedValueChange} 
                onKeyDown={(e) => handleOptionChange(keyAction(e, (highlightIndex > 0 && listOptions[highlightIndex])))}
                onFocus={() => handleRefreshOptions(true)}
                ref={setAnchorEl}
                InputProps={{endAdornment: 
                    <InputAdornment>
                        { loading && <CircularProgress size={20}/> }
                        {
                            open ?
                            <ArrowDropUpIcon style={{marginLeft: theme.spacing(1)}}/> :
                            <ArrowDropDownIcon style={{marginLeft: theme.spacing(1)}}/>
                        }
                    </InputAdornment>
                }}
            />
            <AutoCompletePopper open={open} anchorEl={anchorEl} listOptions={listOptions}
                highlightIndex={highlightIndex} handleClose={handleClose}
                handleOptionChange={handleOptionChange} setSelectedValue={setSelectedValue}
            />
        </Fragment>
    );
}
 
export default Autocomplete;