import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppStateContext } from '../../contexts/AppState';

const MenuButton = () => {
    const { setMenuOpen } = useContext(AppStateContext);

    return (
        <IconButton onClick={() => setMenuOpen(true)}
            color="inherit"
        >
            <MenuIcon/>
        </IconButton>
    );
};

export default MenuButton;