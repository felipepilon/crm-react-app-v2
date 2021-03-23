import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import UserStoreReport from './UserStoreReport';

const UserStoreRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}`}>
                <UserStoreReport/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default UserStoreRouter;