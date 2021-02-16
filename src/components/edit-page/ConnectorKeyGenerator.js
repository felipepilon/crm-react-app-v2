import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField, Tooltip, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { get_ConnRefreshToken } from '../../services/User';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const ConnectorKeyGenerator = ({user_id}) => {
    const intl = useIntl();
    const theme = useTheme();

    const [refreshToken, setRefreshToken] = useState('');
    const [openCopySnack, setOpenCopySnack] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlGenerateTokenClick = () => {
        setLoading(true);
        setOpenConfirmationDialog(false);

        get_ConnRefreshToken({user_id})
        .then((res) => {
            if (res.refresh_token) {
                setRefreshToken(res.refresh_token);
                setError('');
            } else {
                setRefreshToken('');
                setError('Token not generated');
            }
            setLoading(false);
        })
        .catch((err) => {
            setRefreshToken('');
            setError(err.message || 'Token not generated');
            setLoading(false);
        })        
    }

    const handleCopyClick = () => {
        if (!refreshToken) {
            setError('Generate a Token first');
        } else {
            navigator.clipboard.writeText(refreshToken);
            setOpenCopySnack(true);
        }
    }

    return (
        <Box display='flex' alignItems='center' marginTop={1} position='relative'>
            <Box width='30%'>
                <Button variant='outlined' onClick={() => setOpenConfirmationDialog(true)}>
                    <FormattedMessage id='Generate Token'/>
                </Button>
            </Box>
            <Box flex='1'>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    rowsMax={6}
                    size='small'
                    value={refreshToken}
                    disabled
                    variant='outlined'
                    error={error ? true : false}
                    helperText={error && intl.formatMessage({ id: error })}
                />
            </Box>
            <Tooltip title={intl.formatMessage({id: 'Copy'})}>
                <IconButton onClick={handleCopyClick}>
                    <FileCopyIcon/>
                </IconButton>
            </Tooltip>
            <Snackbar open={openCopySnack} autoHideDuration={2000}
                onClose={() => setOpenCopySnack(false)}
                message={intl.formatMessage({id: 'Copied'})}
            />
            <Dialog open={openConfirmationDialog}
                onClose={() => setOpenConfirmationDialog(false)}
            >
                <DialogTitle><FormattedMessage id="Confirm Token Generation"/></DialogTitle>
                <DialogContent>
                    <DialogContentText><FormattedMessage id='Token generation confirmation text part 1'/></DialogContentText>
                    <DialogContentText><FormattedMessage id='Token generation confirmation text part 2'/></DialogContentText>
                    <DialogActions>
                        <Button color='primary' onClick={() => setOpenConfirmationDialog(false)}>Cancelar</Button>
                        <Button color='primary' onClick={handlGenerateTokenClick}>Gerar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            {
                loading &&
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                    style={{opacity: 0.3}}
                >
                    <CircularProgress/>
                </Box>
            }
        </Box>
    );
}
 
export default ConnectorKeyGenerator;