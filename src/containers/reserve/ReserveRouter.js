import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import ReserveList from './ReserveList';

const ReserveRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route path={`${path}`}>
                <ReserveList/>
            </Route>
        </Switch>
    );
}
 
export default ReserveRouter;