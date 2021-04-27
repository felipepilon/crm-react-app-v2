import React, { createContext, useState, useEffect, useContext } from 'react';
import { get_AuthUser } from '../services/Auth';
import { AbilityContext } from './Can';
import AbilityUpdater from '../ability/AbilityUpdater';

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const ability = useContext(AbilityContext);
    
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ authenticated, setAuthenticated ] = useState(false);

    const authenticate = () => {
        console.log('authenticate called')

        setLoading(true);
        
        get_AuthUser()
        .then((resUsr) => {
            setUser(resUsr);
            setAuthenticated(true);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Initial authentication failed');
            console.error(err);
            deauthenticate();
        });
    }

    const deauthenticate = () => {
        setUser({});
        setAuthenticated(false);
        setLoading(false);
    };

    useEffect(() => {
        AbilityUpdater(ability, user, authenticated);
    // eslint-disable-next-line
    }, [user, authenticated])

    useEffect(() => {
        authenticate();
    // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            authenticated,
            authenticate,
            deauthenticate,
            loading
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;