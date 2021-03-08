import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

const AppStateContextProvider = ({children}) => {
    const [ statusStack, setStatusStack ] = useState([]);
    const [ isMenuOpen, setMenuOpen ] = useState(false);
    const [ sucessSnack, setSucessSnack ] = useState('');
    const [ currency, setCurrency ] = useState('BRL');
    const [ error, setError ] = useState();
    const [ pageTitle, setPageTitle] = useState('CRM');

    const addStatus = (sts) => setStatusStack((prev) => [...prev, sts]);

    const removeStatus = (sts) => setStatusStack((prev) => prev.filter((elm) => elm !== sts))
    
    return (
        <AppStateContext.Provider value={{
            statusStack,
            addStatus, removeStatus,
            isMenuOpen, setMenuOpen,
            sucessSnack, setSucessSnack,
            currency, setCurrency,
            error, setError,
            pageTitle, setPageTitle
        }}
        >
            { children }
        </AppStateContext.Provider>
    )
};

export default AppStateContextProvider;