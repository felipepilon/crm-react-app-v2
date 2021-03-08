import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const AddButton = ({handleClick}) => {
    const theme = useTheme();

    return (
        <Button variant='contained' color='primary' 
            style={{marginLeft: theme.spacing(1)}}
            endIcon={<AddIcon/>}
            onClick={handleClick}
        >
            <FormattedMessage id='New'/>
        </Button>
    );
}
 
export default AddButton;