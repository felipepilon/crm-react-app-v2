import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import WorkspaceContextProvider from '../../contexts/Workspace';
import WorkspaceWrapper from './WorkspaceWrapper';
import WorkspaceRouter from './WorkspaceRouter';
import PageWrapper from '../../components/Page/PageWrapper';
import { useRouteMatch } from 'react-router-dom';
import MenuDrawer from '../../components/MenuDrawer';
import WorkBar from '../../components/WorkBar';
import SuccessSnack from '../../components/SuccessSnack';

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
                <SuccessSnack/>
            </WorkspaceWrapper>
        </WorkspaceContextProvider>
    );
}
 
export default Workspace;