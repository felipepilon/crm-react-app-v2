import React, { createContext, useState } from 'react';
import { get_StoreGroup } from '../../services/StoreGroup';
import { useHistory, useLocation } from 'react-router-dom';

export const WorkspaceContext = createContext();

const WorkspaceContextProvider = ({children, store_group_code}) => {
    const hist = useHistory();
    const loc = useLocation();

    const [ storeGroup, setStoreGroup ] = useState(null);
    
    const redirectNotFound = () => {
        hist.replace('/v2/storeGroups', {...loc.state, from: loc});
    }

    useState(() => {
        if (store_group_code && (!storeGroup || storeGroup.store_group_code !== store_group_code)) {
            get_StoreGroup({store_group_code})
            .then((res) => {
                if (res) {
                    setStoreGroup(res);
                } else {
                    redirectNotFound();
                }
            })
            .catch((err) => {
                console.error('Error getting store group: ', err);
                redirectNotFound();
            })
        }
    }, [store_group_code]);
    
    return (
        <WorkspaceContext.Provider value={{
            storeGroup,
            store_group_code
        }}
        >
            { children }
        </WorkspaceContext.Provider>
    )
};

export default WorkspaceContextProvider;