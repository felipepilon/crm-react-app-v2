import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import WorkspaceContextProvider from '../../contexts/Workspace';
import WorkBar from '../WorkBar/WorkBar';
import WorkspaceWrapper from './WorkspaceWrapper';
import WorkspaceRouter from './WorkspaceRouter';
import PageWrapper from '../../components/Page/PageWrapper';
import { useRouteMatch } from 'react-router-dom';
import MenuDrawer from '../MenuDrawer';

const Workspace = () => {
    const { store_group_code } = useRouteMatch().params;
    const { setStatus } = useContext(AppStateContext);

    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line
    }, []);
    
    return (
        <WorkspaceContextProvider store_group_code={store_group_code}>
            <WorkspaceWrapper>
                <WorkBar/>
                <MenuDrawer/>
                <PageWrapper>
                    <WorkspaceRouter/>
                </PageWrapper>
            </WorkspaceWrapper>
        </WorkspaceContextProvider>
    );

    /*
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
    */
}
 
export default Workspace;