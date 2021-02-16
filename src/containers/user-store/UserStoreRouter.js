import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserStoreList from './UserStoreList';

const UserStoreRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <UserStoreList/>
            </Route>
        </Switch>
    );
}
 
export default UserStoreRouter;