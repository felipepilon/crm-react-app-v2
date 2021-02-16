import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserStoreGroupList from './UserStoreGroupList';

const UserStoreGroupRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <UserStoreGroupList/>
            </Route>
        </Switch>
    );
}
 
export default UserStoreGroupRouter;