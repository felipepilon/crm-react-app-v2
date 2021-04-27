import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({children, ...other}) => {
    const { authenticated } = useContext(AuthContext);
    
    return (
        <Route {...other}
            render={() => authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/login' }}
                    />
                )
            }
        />
    );
}
 
export default PrivateRoute;