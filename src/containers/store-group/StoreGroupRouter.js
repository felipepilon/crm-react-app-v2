import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import StoreGroupList from './StoreGroupList';

const StoreGroupRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <StoreGroupList/>
            </Route>
        </Switch>
    );
}
 
export default StoreGroupRouter;