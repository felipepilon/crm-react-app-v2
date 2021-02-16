import React from 'react';
import { useRouteMatch, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Email from './Email';
import Password from './Password';
import PasswordForceChange from './PasswordForceChange';

const LoginRouter = () => {
    const loc = useLocation();
    const state = loc.state || {};

    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Email/>
            </Route>
            <Route exact path={`${path}/email`}>
                <Email/>
            </Route>
            <Route path={`${path}/password`}
                render={({location}) => {
                    return (
                        state.user ?
                        state.user.force_password_change ?
                        <PasswordForceChange/> :
                        <Password/> :
                        <Redirect to={{
                            pathname: `${path}/email`,
                            state: { from: location },
                        }}/>
                    )
                }}
            />
            <Route path={`${path}/*`}>
                <div>Not Found</div>
            </Route>
        </Switch>
    );
}
 
export default LoginRouter;