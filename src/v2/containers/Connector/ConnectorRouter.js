import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import ConnectorReport from './ConnectorReport';

const ConnectorRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}`}>
                <ConnectorReport/>
            </Route>
            <Route path={path}>
                <NotFound/>
            </Route>
        </Switch>
    );
}
 
export default ConnectorRouter;