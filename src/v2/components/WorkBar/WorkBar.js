import React from 'react';
import { AppBar, Toolbar, Typography, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import CustomerSearchToContact from '../CustomerSearchToContact';
import MenuButton from '../MenuDrawer/MenuButton';
import LoginMenu from '../LoginMenu';

const WorkBar = () => {
    const theme = useTheme();

    return ( 
        <AppBar position='static'>
            <Toolbar>
                <MenuButton/>
                {
                    <Typography variant='h5' style={{marginRight: theme.spacing(2)}}><FormattedMessage id="CRM"/></Typography>
                    /*<img src={require('./home-bar.png')} height='45px' style={{marginLeft: theme.spacing(1), marginRight: theme.spacing(3)}} alt=''/>*/
                }
                <CustomerSearchToContact/>
                <LoginMenu/>
            </Toolbar>
        </AppBar>
     );
}
 
export default WorkBar;