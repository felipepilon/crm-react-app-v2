import { Button, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const EditPageButton = ({handleClick, title, marginRight, color, hidden}) => {
    const theme = useTheme();
    return (
        <Button 
            variant='contained' 
            onClick={handleClick} 
            color={color || 'default'}
            style={{marginRight: theme.spacing(marginRight || 0)}}
            hidden={hidden}
        >
            <FormattedMessage id={title}/>
        </Button>
    );
}
 
export default EditPageButton;