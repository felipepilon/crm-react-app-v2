import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import SearchDialogContent from './SearchDialogContent';

const SearchDialog = ({open, handleClose, title, modelTitle, schema, setFilters, values, defaultValues}) => {
    const theme = useTheme();

    const [_values, _setValues] = useState(values || {});

    const handleReset = () => {
        _setValues(defaultValues || {});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters(_values);
        handleClose();
    }

    const handleFieldChange = (fldKey, fldValue) => {
        _setValues((prevValues) => ({...prevValues, [fldKey]: fldValue}))
    }

    const _handleClose = () => {
        _setValues(values || {});
        handleClose();
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Dialog open={open} onClose={_handleClose} maxWidth='sm' fullWidth disablePortal>
                <DialogTitle style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}>
                    <FormattedMessage id={title || 'Search {modelTitle}'} values={{modelTitle}}/>
                </DialogTitle>
                <DialogContent>
                    <SearchDialogContent schema={schema} values={_values} handleFieldChange={handleFieldChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={_handleClose} variant='outlined'>
                        <FormattedMessage id='Cancel'/>
                    </Button>
                    <Button color='primary' onClick={handleReset} variant='outlined'>
                        <FormattedMessage id='Reset'/>
                    </Button>
                    <Button color='primary' type='submit' variant='contained' onClick={handleSubmit}>
                        <FormattedMessage id='Search'/>
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
 
export default SearchDialog;