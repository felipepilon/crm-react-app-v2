import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';

const PageHeader = ({children}) => {
    const { pageTitle } = useContext(AppStateContext);

    return (
        <Box display='flex' alignItems='center' marginBottom={1}>
            {
                pageTitle &&
                <Typography variant='h5'><FormattedMessage id={pageTitle}/></Typography>
            }
            <Box display='flex' justifyContent='flex-end' alignItems='center' flex='1'>
                {children}
            </Box>
        </Box>
    );
}
 
export default PageHeader;