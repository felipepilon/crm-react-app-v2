import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Customers from '../Customers';

const AppRouter = () => {
    const match = useRouteMatch();
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path}>
                <div>Exact</div>
            </Route>
            <Route path={`${path}/customers`}>
                <Customers/>
            </Route>
            <Route path={`${path}*`}>
                <div>Not Found Workspace</div>
            </Route>
        </Switch>
    );
}
 
export default AppRouter;