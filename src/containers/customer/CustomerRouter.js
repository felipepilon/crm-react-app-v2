import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';

const UserRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route path={`${path}`}>
                <CustomerList/>
            </Route>
        </Switch>
    );
}
 
export default UserRouter;