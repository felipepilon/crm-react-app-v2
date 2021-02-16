import React, { useContext } from 'react';
import { AppStateContext } from '../contexts/AppState';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { FormattedMessage } from 'react-intl';

const SuccessSnack = () => {
    const { sucessSnack, setSucessSnack }= useContext(AppStateContext);

    const handleClose = () => {
        setSucessSnack('');
    }

    return (
        <Snackbar open={sucessSnack ? true : false} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert 
                onClose={handleClose} 
                severity="success"
                elevation={6}
            >
                {
                    sucessSnack && <FormattedMessage id={sucessSnack} />
                }
            </MuiAlert>
        </Snackbar>
    );
}
 
export default SuccessSnack;