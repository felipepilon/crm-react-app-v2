import { Box, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LoadingAbsoluteBox from '../LoadingAbsoluteBox/LoadingAbsoluteBox';

const DialogForm = ({open, handleClose, title, titleValues, children, actions, handleSubmit, loading}) => {
    const theme = useTheme();

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete='off' style={{position: 'relative'}}>
            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth disablePortal>
                <DialogTitle style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}>
                    <FormattedMessage id={title} values={titleValues}/>
                </DialogTitle>
                <DialogContent>
                    <Box diplay='flex' flexDirection='column'>{
                        children
                    }</Box>
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
                <LoadingAbsoluteBox loading={loading}/>
            </Dialog>
        </form>
    );
}
 
export default DialogForm;