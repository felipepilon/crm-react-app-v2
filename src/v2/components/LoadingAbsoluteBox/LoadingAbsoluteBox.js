import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const LoadingAbsoluteBox = ({loading}) => {
    if (!loading)   
        return null;

    console.log('loading =>', loading)

    return (
        <Box display='flex' position='absolute'
            height='100%' width='100%'
            left='0' top='0'
            justifyContent='center'
            alignItems='center'
            bgcolor='background.paper'
            zIndex='1'
            style={{opacity: 0.3}}
        >
            <CircularProgress/>
            {
                typeof loading === 'object' &&
                <Typography variant='body1'>
                    <FormattedMessage id={loading[0]} values={loading[1]}/>
                </Typography>   
            }
        </Box>
    );
}
 
export default LoadingAbsoluteBox;