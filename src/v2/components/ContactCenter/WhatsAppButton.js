import React from 'react';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const WhatsAppButton = ({contactVia, handleClick}) => {
    const disabled = contactVia === 'WhatsApp';

    return (
        <Button variant='contained'
            style={{ width: '50%' }}
            endIcon={<WhatsAppIcon/>}
            onClick={handleClick}
            color='primary'
            disabled={disabled}
        >
            <FormattedMessage id='WhatsApp'/>
        </Button>
    );
}
 
export default WhatsAppButton;