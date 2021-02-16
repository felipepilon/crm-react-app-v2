import React from 'react';
import { Box } from '@material-ui/core';
import WorkBar from './WorkBar';
import MenuDrawer from './menu/MenuDrawer'
import WorkspaceWrapper from '../../components/WorkspaceWrapper';
import SuccessSnack from '../../components/SuccessSnack';

const Workspace = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='0'
            height='100%'
        >
            <WorkBar/>
            <MenuDrawer/>
            <WorkspaceWrapper/>
            <Box height='30px'>Footer</Box>
            <SuccessSnack/>
        </Box>
    );
}
 
export default Workspace;