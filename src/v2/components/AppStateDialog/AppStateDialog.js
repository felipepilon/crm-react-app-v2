import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';

const AppStateDialog = () => {
    const { error, setError } = useContext(AppStateContext);

    const handleClose = () => {
        setError(null);
    }
    
    const open = Boolean(error);

    if (!open)
        return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle><FormattedMessage id='Error'/></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FormattedMessage id={
                        typeof error === 'object' ?
                        error.message || 'Unknow error' :
                        error
                    }/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <FormattedMessage id='Close'/>
                </Button>
        </DialogActions>
        </Dialog>
    );
}
 
export default AppStateDialog;