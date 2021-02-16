import { Box, useTheme } from '@material-ui/core';
import React from 'react';

const DisabledAbsoluteBox = ({disabled}) => {
    const theme = useTheme();
    
    if (!disabled)   
        return null;

    return (
        <Box
            display='flex'
            position='absolute'
            height='100%'
            width='100%'
            justifyContent='center'
            alignItems='center'
            bgcolor={theme.palette.background.paper}
            zIndex='1'
            style={{opacity: 0.3}}
        />
    );
}
 
export default DisabledAbsoluteBox;