import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth';
import { get_StoreGroups } from '../../../services/StoreGroup';
import { AppStateContext } from '../../contexts/AppState';

const statuses = {
    loadingStoreGroup: 'Loading store group',
    loadingStoreGroups: 'Loading store groups'
} 

const StoreGroupSelect = () => {
    const { addStatus, removeStatus } = useContext(AppStateContext);
    const { setStoreGroup } = useContext(AuthContext);

    const hist = useHistory();
    const loc = useLocation();

    useEffect(() => {
        removeStatus(statuses.loadingStoreGroup);

        addStatus(statuses.loadingStoreGroups);

        get_StoreGroups({})
        .then((res) => {
            if (res.length === 1) {
                setStoreGroup(res[0]);
                hist.replace(`/v2/${res[0].store_group_code}/workspace`, loc.state);
                removeStatus(statuses.loadingStoreGroups);
            }
        });
    // eslint-disable-next-line
    }, []);

    return (
        <div>Store group select</div>
    );
}
 
export default StoreGroupSelect;