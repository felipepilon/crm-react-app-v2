import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { AppStateContext } from '../../contexts/AppState';
import DialogForm from '../DialogForm';
import EditDialogContent from './EditDialogContent';

const EditDialog = ({
    open, handleClose, title, modelTitle, schema, editFnc,
    handleSubmit, values, action, getFnc, rowId
}) => {
    const { setError: setErrorContext } = useContext(AppStateContext);

    const match = useRouteMatch();
    const intl = useIntl();
    
    const [_values, _setValues] = useState(values || {});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(null);

    const _modelTitle = intl.formatMessage({id: modelTitle})

    const loadValues = () => {
        setLoading(['Loading {modelTitle}', { modelTitle: _modelTitle }]);
        setError({});

        if (action === 'update') {
            if (!getFnc) {
                console.error('No get function found (getFnc)');
                _handleClose();
            }

            getFnc({...match.params, [rowId]: values[rowId]})
            .then((res) => {
                _setValues(res);
                setLoading(null);
            })
            .catch((err) => {
                setErrorContext({message: 'Error getting record: {message}', raw: err});
                _handleClose();
            });
        } else {
            _setValues(values || {})
            setLoading(null);
        }
    }

    useEffect(() => {
        if (open)
            loadValues();
    // eslint-disable-next-line
    }, [open, values])

    const _handleSubmit = (e) => {
        e.preventDefault();

        setLoading(['Updating {modelTitle}', { modelTitle: _modelTitle }]);

        if (!editFnc) {
            console.error('No update function found (editFnc)');
            setLoading(null);
            return;
        }

        editFnc({
            ...match.params,
            [rowId]: values[rowId],
            values: _values
        })
        .then(() => {
            setLoading(null);
            handleSubmit();
            _handleClose();
        })
        .catch((err) => {
            console.log('edit dialog err =>' , err)
            setError(err || {});
            setLoading(null);
        });
    }

    const handleFieldChange = (fldKey, fldValue) => {
        _setValues((prevValues) => ({...prevValues, [fldKey]: fldValue}));

        if (error && error.fields && error.fields[fldKey])
            setError((prevError) => ({...prevError, fields: {...prevError.fields, [fldKey]: undefined}}))
    }

    const _handleClose = () => {
        handleClose();
        setLoading(null);
        _setValues(values || {});
        setError({});
    }

    const handleReset = () => {
        loadValues();
    }

    const _title = title || (action === 'add' ? 'Add {modelTitle}' : 'Update {modelTitle}');

    return (
        <DialogForm open={open} title={_title} titleValues={{ modelTitle: _modelTitle }}
            handleClose={_handleClose}
            handleSubmit={_handleSubmit}
            actions={
                <Fragment>
                    <Button color='primary' onClick={_handleClose} variant='outlined'>
                        <FormattedMessage id='Cancel'/>
                    </Button>
                    <Button color='primary' onClick={handleReset} variant='outlined'>
                        <FormattedMessage id='Reset'/>
                    </Button>
                    <Button color='primary' type='submit' variant='contained' onClick={_handleSubmit}>
                        <FormattedMessage id={action === 'add' ? 'Submit' : 'Update'}/>
                    </Button>
                </Fragment>
            }
        >
            <EditDialogContent schema={schema} values={_values} errors={(error && error.fields) || {}} handleFieldChange={handleFieldChange}/>
        </DialogForm>
    );
}
 
export default EditDialog;