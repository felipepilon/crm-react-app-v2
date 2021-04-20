import React, { useContext } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import { Drawer, List, Divider, Box, Typography, useTheme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Can } from '../../../contexts/Can';
import MenuItem from './MenuItem';

const MenuDrawer = () => {
    const { isMenuOpen, setMenuOpen } = useContext(AppStateContext);

    const theme = useTheme();

    const closeDrawer = () => {
        setMenuOpen(false);
    };

    return (
        <Drawer open={isMenuOpen} onClose={closeDrawer}>
            <Box width='250' onClick={closeDrawer} onKeyDown={closeDrawer}>
                <Typography variant='caption' style={{marginLeft: theme.spacing(2)}}>v2.0</Typography>
                <List>
                    <MenuItem title='Workspace' to='' iconComp={<HomeIcon/>}/>
                </List>
                <Divider/>
                <List>
                    <Can I='read' a='User'>
                        <MenuItem title='Users' to='/users'/>
                    </Can>
                    <Can I='read' a='StoreGroup'>
                        <MenuItem title='Store Groups' to='/storeGroups'/>
                    </Can>
                    <Can I='read' a='Connector'>
                        <MenuItem title='Connectors' to='/connectors'/>
                    </Can>
                </List>
            </Box>
        </Drawer>
    );
};

export default MenuDrawer;