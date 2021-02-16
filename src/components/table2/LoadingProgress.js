import { Box, CircularProgress } from '@material-ui/core';
import React, { Fragment } from 'react';

const LoadingProgress = ({loading}) => {
    return (
        <Fragment>{
            loading &&
            <Box padding={2}>
                <CircularProgress size={20}/>
            </Box>
        }</Fragment>
    );
}
 
export default LoadingProgress;