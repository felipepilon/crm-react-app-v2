import { Button, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ListPageButton = ({handleClick, title}) => {
    const theme = useTheme();

    return (
        <Button variant='contained' color='primary' style={{marginLeft: theme.spacing(1)}} onClick={handleClick}>
            <FormattedMessage id={title}/>
        </Button>
    );
}
 
export default ListPageButton;