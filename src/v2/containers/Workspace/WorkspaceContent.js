import React, { useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { WorkspaceContext } from '../../contexts/Workspace';
import WorkBar from '../../components/WorkBar';
import MenuDrawer from '../../components/MenuDrawer';
import PageWrapper from '../../components/Page/PageWrapper';
import WorkspaceRouter from './WorkspaceRouter';
import { AppStateContext } from '../../contexts/AppState';
import NotFound from '../NotFound';

const loadingStatus = 'Loading Workspace';

const WorkspaceContent = () => {
    const { addStatus, removeStatus } = useContext(AppStateContext);
    const { loading, storeGroup } = useContext(WorkspaceContext);

    useEffect(() => {
        if (loading)
            addStatus(loadingStatus);
        else
            removeStatus(loadingStatus);

    // eslint-disable-next-line
    }, [loading])

    if (loading)
        return null;

    if (!storeGroup)
        return (<NotFound/>)

    return (
        <Fragment>
            <WorkBar/>
            <MenuDrawer/>
            <PageWrapper>
                <WorkspaceRouter/>
            </PageWrapper>
        </Fragment>
    );
}
 
export default WorkspaceContent;