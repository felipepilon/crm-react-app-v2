import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import StoreGroupsReport from './StoreGroupReport';

const StoreGroupRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}`}>
                <StoreGroupsReport/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default StoreGroupRouter;