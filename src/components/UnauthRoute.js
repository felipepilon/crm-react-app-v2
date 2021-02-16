import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';

const UnauthRoute = ({ children, ...other }) => {
    const { authenticated, storeGroup } = useContext(AuthContext);

    console.log('UnauthRoute', authenticated, storeGroup);

    const { store_group_code } = useRouteMatch().params;

    return (
        <Route
            {...other}
            render={({ location }) =>
            !authenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: store_group_code ? `/v2/${store_group_code}/workspace` : '/v2/storeGroups',
                        state: { ...location, from: location }
                    }}
                />
            )
            }
        />
    );
}
 
export default UnauthRoute;