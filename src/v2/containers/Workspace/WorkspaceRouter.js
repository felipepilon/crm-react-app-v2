import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Customers from '../Customers';
import User from '../User'
import WorkspaceHome from '../WorkspaceHome';
import Reserves from '../Reserves';
import StoreGroup from '../StoreGroup';
import Connector from '../Connector';

const AppRouter = () => {
    const match = useRouteMatch();
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path}>
                <WorkspaceHome/>
            </Route>
            <Route path={`${path}/customers`}>
                <Customers/>
            </Route>
            <Route path={`${path}/users`}>
                <User/>
            </Route>
            <Route path={`${path}/reserves`}>
                <Reserves/>
            </Route>
            <Route path={`${path}/storeGroups`}>
                <StoreGroup/>
            </Route>
            <Route path={`${path}/connectors`}>
                <Connector/>
            </Route>
            <Route path={`${path}*`}>
                <div>Not Found Workspace</div>
            </Route>
        </Switch>
    );
}
 
export default AppRouter;