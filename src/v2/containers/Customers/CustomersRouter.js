import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import CustomerContact from './CustomerContact';

const CustomersRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:customer_id/contact`}>
                <CustomerContact/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default CustomersRouter;