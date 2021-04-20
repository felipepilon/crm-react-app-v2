import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import AddReserve from './AddReserve';

const CustomersRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/add`}>
                <AddReserve/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default CustomersRouter;