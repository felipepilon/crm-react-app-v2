import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppStateContext } from './AppState';
import { get_AuthUser } from '../services/Auth';
import { AbilityContext } from './Can';
import AbilityUpdater from '../ability/AbilityUpdater';
import { useHistory, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const loc = useLocation();
    const hist = useHistory();

    const { setStatus, status } = useContext(AppStateContext);

    const ability = useContext(AbilityContext);

    const storeGroup = (loc.state && loc.state.storeGroup) || {};
    const user = (loc.state && loc.state.user) || {};
    
    const setStoreGroup = (newStoreGroup) => {
        hist.replace(loc.pathname, { ...loc.state, storeGroup: newStoreGroup });
    }

    const setUser = (newUser) => {
        hist.replace(loc.pathname, { ...loc.state, user: newUser });
    }

    const [ authenticated, setAuthenticated ] = useState(false);
    
    const authenticate = () => {
        console.log('authenticated', authenticated)
        
        get_AuthUser()
        .then((resUsr) => {
            setUser(resUsr);
            setAuthenticated(true);

            if (status === 'initiating')
                setStatus('loading');
        })
        .catch((err) => {
            console.error('Initial authentication failed');
            console.error(err);
            deauthenticate();
        });
    }

    const deauthenticate = () => {
        setUser({});
        setStoreGroup({});
        setAuthenticated(false);
        setStatus('loading');
    };

    useEffect(() => {
        authenticate();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        AbilityUpdater(ability, user, authenticated);
    // eslint-disable-next-line
    }, [user, authenticated])

    return (
        <AuthContext.Provider value={{
            user,
            authenticated,
            authenticate,
            deauthenticate,
            setUser,
            storeGroup, setStoreGroup
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;