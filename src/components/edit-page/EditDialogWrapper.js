import { Box, Dialog, DialogTitle } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LoadingAbsoluteBox from '../../components/LoadingAbsoluteBox'

const EditDialogWrapper = ({children, loading, handleClose, open, title}) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth disableBackdropClick>
            <DialogTitle><FormattedMessage id={title}/></DialogTitle>
            <Box display='flex' alignItems='center' flexDirection='column'>
                {children}
            </Box>
            <LoadingAbsoluteBox loading={loading}/>
        </Dialog>
    );
}
 
export default EditDialogWrapper;