import { Box, Button, IconButton, setRef, TextField, Tooltip, Typography, useTheme } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import DialogForm from '../DialogForm';
import DialogFormControl from '../DialogFormControl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GenerateTokenConfirmDialog from './GenerateTokenConfirmDialog';
import { Fragment } from 'react';
import { get_ConnUserRefreshToken } from '../../../services/ConnUser';
import { AppStateContext } from '../../contexts/AppState';

const GenerateTokenDialog = ({open, connUser, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const intl = useIntl();
    const theme = useTheme();

    const [ error, setError ] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleCopyClick = () => {
        if (!refreshToken) {
            setError('Generate a Token first');
        } else {
            navigator.clipboard.writeText(refreshToken);
            setSucessSnack('Copied');
        }
    }

    const handleConfirm = () => {
        setLoading(true);
        setOpenConfirmationDialog(false);

        get_ConnUserRefreshToken({
            store_group_code: connUser.store_group_code,
            user_id: connUser.user_id
        })
        .then((res) => {
            setRefreshToken(res.refresh_token);
            setLoading(false);
        })
        .catch((err) => {
            setRefreshToken('');
            setError(err.message || 'Error getting token');
            setLoading(false);
        })
    }

    if (!connUser)
        return null;
    
    return (
        <Fragment>
            <DialogForm open={open} title='Generate Token' handleClose = {handleClose} loading={loading}
                actions={
                    <Button onClick={handleClose}>
                        <FormattedMessage id='Close'/>
                    </Button>
                }
            >
                <DialogFormControl title='Store'
                    control={<Typography variant='body1'>{`${connUser.store_code} - ${connUser.store_name}`}</Typography>}
                />
                <DialogFormControl title='Access Token'
                    control={
                        <Box display='flex' width='100%' flexDirection='column' marginTop={1}>
                            <Box display='flex' alignItems='center'>
                                <TextField fullWidth multiline rows={4} rowsMax={6}
                                    size='small' disabled variant='outlined'
                                    error={Boolean(error)}
                                    helperText={error && intl.formatMessage({ id: error })}
                                    InputProps={{ readOnly: true }}
                                    value={refreshToken}
                                />
                                <Tooltip title={intl.formatMessage({id: 'Copy'})}>
                                    <IconButton onClick={handleCopyClick}>
                                        <FileCopyIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Button variant='contained' color='primary' style={{marginTop: theme.spacing(1)}}
                                onClick={() => setOpenConfirmationDialog(true)}
                            >
                                <FormattedMessage id='Generate Token'/>
                            </Button>
                        </Box>
                    }
                />
            </DialogForm>
            <GenerateTokenConfirmDialog 
                open={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                handleConfirm={handleConfirm}
                connUser={connUser}
            />
        </Fragment>
    );
}
 
export default GenerateTokenDialog;