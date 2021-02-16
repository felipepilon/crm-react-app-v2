import React from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedPageTitle = (props) => {
    return (
        <Typography variant='h6' style={{flex: '1'}}>
            <FormattedMessage id={props.title}/>
        </Typography>
    );
}
 
export default EnhancedPageTitle;