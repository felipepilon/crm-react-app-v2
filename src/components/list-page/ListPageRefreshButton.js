import { Button, useTheme } from '@material-ui/core';
import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

const ListPageRefreshButton = ({handleClick}) => {
    const theme = useTheme();

    return (
        <Button variant='contained' color='primary' style={{marginLeft: theme.spacing(1)}} onClick={handleClick}>
            <RefreshIcon/>
        </Button>
    );
}
 
export default ListPageRefreshButton;