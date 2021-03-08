import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import UsersReport from './UsersReport';

const CustomersRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}`}>
                <UsersReport/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default CustomersRouter;