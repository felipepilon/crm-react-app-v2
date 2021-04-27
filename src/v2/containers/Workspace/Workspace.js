import React from 'react';
import WorkspaceContextProvider from '../../contexts/Workspace';
import { useRouteMatch } from 'react-router-dom';
import WorkspaceContent from './WorkspaceContent';

const Workspace = () => {
    const { store_group_code } = useRouteMatch().params;
    
    return (
        <WorkspaceContextProvider store_group_code={store_group_code}>
            <WorkspaceContent/>
        </WorkspaceContextProvider>
    );
}

export default Workspace;