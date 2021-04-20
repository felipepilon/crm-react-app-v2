import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import UserStoreRouter from '../UserStore';
import UserReport from './UserReport';

const UserRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:user_id/stores`}>
                <UserStoreRouter/>
            </Route>
            <Route path={`${path}`}>
                <UserReport/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default UserRouter;