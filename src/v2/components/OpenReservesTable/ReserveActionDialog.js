import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ReserveActionDialog = ({status, handleClose, handleConfirm, open, reserve}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <FormattedMessage id={
                    status === 'Canceled' ?
                    'Confirm reservation canceling?' :
                    'Confirm reservation closing?'
                }/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FormattedMessage id='Product'/> : {reserve.product_code}<br/>
                    <FormattedMessage id='Description'/> : {reserve.product_desc}<br/>
                    <FormattedMessage id='Color'/> : {reserve.product_color_code}<br/>
                    <FormattedMessage id='Size'/> : {reserve.size}<br/>
                    <FormattedMessage id='Quantity'/> : {reserve.quantity}<br/>
                    <FormattedMessage id='Store'/> : {reserve.store_name}<br/>
                    <FormattedMessage id='Salesman'/> : {reserve.salesman_name}<br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleConfirm({status, reserve})} color="primary" variant='outlined'>
                    <FormattedMessage id='Yes'/>
                </Button>
                <Button onClick={handleClose} color="primary">
                    <FormattedMessage id='No'/>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default ReserveActionDialog;