import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AgendaGroupCaption = (props) => {
    return (
        <Typography variant='caption'><FormattedMessage id={props.title}/></Typography>
    );
}
 
export default AgendaGroupCaption;