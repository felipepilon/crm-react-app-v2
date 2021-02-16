import React from 'react';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const EnhancedButtonLink = (props) => {
    return (
        <Button variant='contained' color='primary'
            component={Link}
            to={props.to}
        >
            <FormattedMessage id={props.title}/>
        </Button>
    );
}
 
export default EnhancedButtonLink;