import React, { useContext, useState } from 'react';
import { Button, MenuItem, Popover, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { post_SignOut } from '../../../services/Auth';
import { AppStateContext } from '../../contexts/AppState';
import { AuthContext } from '../../../contexts/Auth';

const LoginMenu = () => {
    const { user, deauthenticate } = useContext(AuthContext);
    const { setStatus } = useContext(AppStateContext);

    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ logOutDialog, showLogOutDialot ] = useState(false);

    const handleMenuOpen = e => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = e => {
        e.preventDefault();
        post_SignOut()
        .then(() => {
            deauthenticate();
        })
        .catch(err => {
            console.log('Error signing-out');
            console.log(err);
            deauthenticate();
        })
    }

    const handleLogOutDialogClose = () => {
        showLogOutDialot(false);
    }

    const handleLogOutDialogOpen = () => {
        showLogOutDialot(true);
    }

    const open = Boolean(anchorEl)
    const id = open ? 'primary-locale-menu' : undefined;

    return (
        <Box display='flex' justifyContent='flex-end' flex='1'>
            <Button 
                color="inherit" 
                onClick={handleMenuOpen}
            >
                {`${user.first_name} ${user.last_name}`}
            </Button>
            <Popover
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem 
                    button
                    onClick={handleLogOutDialogOpen}
                >
                    <FormattedMessage id='Sign-Out'/>
                </MenuItem>
            </Popover>
            <Dialog
                open={logOutDialog}
                onClose={handleLogOutDialogClose}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-content"
            >
                <DialogTitle id="logout-dialog-title"><FormattedMessage id='Exit'/></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-content">
                        <FormattedMessage id='Are your sure you want to exit from CRM?'/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogOut} color="primary">
                        <FormattedMessage id='Yes'/>
                    </Button>
                    <Button onClick={handleLogOutDialogClose} color="primary">
                        <FormattedMessage id='No'/>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default LoginMenu;