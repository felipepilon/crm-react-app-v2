import React from 'react';
import { Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import PhoneIcon from '@material-ui/icons/Phone';

const PhoneCallButton = (props) => {
    const theme = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }

    const disabled = props.contactVia === 'Phone Call';

    return (
        <Button 
            variant='contained' 
            style={{ marginLeft: theme.spacing(1), width: '50%' }}
            endIcon={<PhoneIcon/>}
            onClick={handleClick}
            color='primary'
            disabled={disabled}
        >
            <FormattedMessage id='Phone'/>
        </Button>
    );
}
 
export default PhoneCallButton;