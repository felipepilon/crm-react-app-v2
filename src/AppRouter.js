import React from 'react';
import { Switch } from 'react-router-dom';
import Login from './containers/login/LoginWrapper';
import Workspace from './containers/workspace/Workspace';
import WorkspaceV2 from './v2/containers/Workspace';
import PrivateRoute from './components/PrivateRoute';
import UnauthRoute from './components/UnauthRoute';
import StoreGroupsRouter from './v2/containers/StoreGroups/StoreGroupsRouter';

const AppRouter = () => {
    return (
        <Switch>
            <UnauthRoute path='/login'>
                <Login/>
            </UnauthRoute>
            <PrivateRoute path='/v2/storeGroups'>
                <StoreGroupsRouter/>
            </PrivateRoute>
            <PrivateRoute path='/workspace'>
                <Workspace/>
            </PrivateRoute>
            <UnauthRoute path='/v2/:store_group_code/login'>
                <Login/>
            </UnauthRoute>
            <PrivateRoute path='/v2/:store_group_code/workspace'>
                <WorkspaceV2/>
            </PrivateRoute>
            <UnauthRoute path='/*'>
                <Login/>
            </UnauthRoute>
        </Switch>
    );
}
 
export default AppRouter;