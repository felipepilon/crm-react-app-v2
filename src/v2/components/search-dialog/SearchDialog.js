import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import SearchDialogContent from './SearchDialogContent';

const SearchDialog = ({open, handleClose, title, modelName, schema, handleSubmit, values, defaultValues}) => {
    const theme = useTheme();
    const intl = useIntl();

    const [_values, _setValues] = useState(values || {});

    const handleReset = () => {
        _setValues(defaultValues || {});
    }

    const _handleSubmit = (e) => {
        e.preventDefault();
        handleSubmit(_values);
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
        <form onSubmit={_handleSubmit} noValidate>
            <Dialog open={open} onClose={_handleClose} maxWidth='sm' fullWidth disablePortal>
                <DialogTitle style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}>
                    <FormattedMessage id={title || 'Search {title}'} values={modelName && {title: intl.formatMessage({id: modelName})}}/>
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
                    <Button color='primary' type='submit' variant='contained' onClick={_handleSubmit}>
                        <FormattedMessage id='Search'/>
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
 
export default SearchDialog;