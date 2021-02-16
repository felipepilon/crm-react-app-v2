import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserStoreList from '../user-store/UserStoreList';
import UserStoreGroupList from '../user-store-group/UserStoreGroupList';

const UserRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/:user_id/stores`}
                render={({match}) => {
                    return (
                        <UserStoreList
                            user_id={match.params.user_id}
                        />
                    )
                }}
            />
            <Route exact path={`${path}/:user_id/storeGroups`}
                render={({match}) => {
                    return (
                        <UserStoreGroupList
                            user_id={match.params.user_id}
                        />
                    )
                }}
            />
            <Route path={`${path}`}>
                <UserList/>
            </Route>
        </Switch>
    );
}
 
export default UserRouter;