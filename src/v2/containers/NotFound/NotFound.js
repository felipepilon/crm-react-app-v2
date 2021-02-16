import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const NotFound = () => {
    return (
        <Box padding={2}>
            <Typography variant='h4'><FormattedMessage id='Oops'/></Typography>
            <Typography variant='subtitle1'><FormattedMessage id='404 - Not Found'/></Typography>
            <Typography variant='body1'><FormattedMessage id='Seems like this page do not exists'/></Typography>
        </Box>
    );
}
 
export default NotFound;