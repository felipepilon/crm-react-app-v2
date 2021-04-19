import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const GenerateTokenConfirmDialog = ({open, handleClose, handleConfirm, connUser}) => {
    return (
        <Dialog open={open}
            onClose={handleClose}
        >
            <DialogTitle><FormattedMessage id="Confirm Token Generation"/></DialogTitle>
            <DialogContent>
                <DialogContentText><FormattedMessage id='Token generation confirmation text part 1' values={connUser}/></DialogContentText>
                <DialogContentText><FormattedMessage id='Token generation confirmation text part 2' values={connUser}/></DialogContentText>
                <DialogActions>
                    <Button color='primary' onClick={handleClose}>Cancelar</Button>
                    <Button color='primary' onClick={handleConfirm}>Gerar</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
 
export default GenerateTokenConfirmDialog;