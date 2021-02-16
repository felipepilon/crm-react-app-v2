import { Box, CircularProgress, useTheme } from '@material-ui/core';
import React from 'react';

const LoadingAbsoluteBox = ({loading}) => {
    const theme = useTheme();
    
    if (!loading)   
        return null;

    return (
        <Box
            display='flex'
            position='absolute'
            height='90%'
            width='97%'
            justifyContent='center'
            alignItems='center'
            bgcolor={theme.palette.background.paper}
            zIndex='1'
            style={{opacity: 0.3}}
        >
            <CircularProgress size={20}/>
        </Box>
    );
}
 
export default LoadingAbsoluteBox;