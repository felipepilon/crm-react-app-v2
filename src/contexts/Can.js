import React, { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import ability from '../ability/AbilityDefault';

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

const AbilityContextProvider = (props) => {
    return (
        <AbilityContext.Provider value={ability}>
            {props.children}
        </AbilityContext.Provider>
    );
};

export default AbilityContextProvider;