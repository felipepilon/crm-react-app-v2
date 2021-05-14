import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/login/LoginWrapper';
import Workspace from './v2/containers/Workspace';
import PrivateRoute from './components/PrivateRoute';
import UnauthRoute from './components/UnauthRoute';
import StoreGroupSelect from './v2/containers/StoreGroupSelect';
import NotFound from './v2/containers/NotFound';

const AppRouter = () => {
    return (
        <Switch>
            <UnauthRoute path='/login'>
                <Login/>
            </UnauthRoute>
            <PrivateRoute path='/storeGroups' exact>
                <StoreGroupSelect/>
            </PrivateRoute>
            <PrivateRoute path='/:store_group_code/workspace'>
                <Workspace/>
            </PrivateRoute>
            <PrivateRoute path='/' exact>
                <StoreGroupSelect/>
            </PrivateRoute>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default AppRouter;