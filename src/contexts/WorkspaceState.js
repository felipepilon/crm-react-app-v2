import React, { createContext, useState } from 'react';

export const WorkspaceStateContext = createContext();

const WorkspaceStateContextProvider = props => {
    const [ status, setStatus ] = useState('');

    return (
        <WorkspaceStateContext.Provider value={{
            status,
            setStatus,
        }}
        >
            { props.children }
        </WorkspaceStateContext.Provider>
    )
};

export default WorkspaceStateContextProvider;