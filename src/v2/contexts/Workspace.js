import React, { createContext, useState } from 'react';
import { get_StoreGroup } from '../../services/StoreGroup';

export const WorkspaceContext = createContext();

const WorkspaceContextProvider = ({children, store_group_code}) => {
    const [ storeGroup, setStoreGroup ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    useState(() => {
        if (store_group_code && (!storeGroup || storeGroup.store_group_code !== store_group_code)) {
            setLoading(true);

            get_StoreGroup({store_group_code})
            .then((res) => {
                if (res) {
                    setStoreGroup(res);
                    setLoading(false);
                } else {
                    setStoreGroup(null);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Error getting store group: ', err);
                setStoreGroup(null);
                setLoading(false);
            });
        }
    }, [store_group_code]);
    
    return (
        <WorkspaceContext.Provider value={{
            storeGroup,
            store_group_code,
            loading
        }}
        >
            { children }
        </WorkspaceContext.Provider>
    )
};

export default WorkspaceContextProvider;