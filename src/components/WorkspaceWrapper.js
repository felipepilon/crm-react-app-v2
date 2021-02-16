import React, { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { AppStateContext } from '../contexts/AppState';
import WorkspaceRouter from './WorkspaceRouter'

const WorkspaceWrapper = () => {
    const { setStatus } = useContext(AppStateContext)

    useEffect(() => {
        setTimeout(() => {
            setStatus('loaded')
        }, 2000)
    })

    return (
        <Box
            display='flex'
            minHeight='0'
            height='100%'
            flex='1'
            overflow='auto'
            flexDirection='column'
        >
            <WorkspaceRouter/>
        </Box>
    );
}
 
export default WorkspaceWrapper;