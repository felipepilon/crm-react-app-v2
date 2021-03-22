import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Customers from '../Customers';
import Users from '../Users'
import WorkspaceHome from '../WorkspaceHome';
import Reserves from '../Reserves';

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
                <Users/>
            </Route>
            <Route path={`${path}/reserves`}>
                <Reserves/>
            </Route>
            <Route path={`${path}*`}>
                <div>Not Found Workspace</div>
            </Route>
        </Switch>
    );
}
 
export default AppRouter;