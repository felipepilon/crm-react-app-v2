import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Unauthorized = () => {
    return (
        <Box padding={2}>
            <Typography variant='h5'><FormattedMessage id='Unauthorized'/></Typography>
        </Box>
    );
}
 
export default Unauthorized;