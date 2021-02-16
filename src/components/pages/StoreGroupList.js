import React, { useState } from 'react';
import { get_StoreGroups } from '../../services/StoreGroup';
import { useLocation } from 'react-router-dom';
import EnhancedListPage from '../list/EnhancedListPage'

const StoreGroupList = () => {    
    const loc = useLocation();

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', type: 'icon edit', to: (row) => {
            return {
                pathname: `/workspace/storeGroups/edit/${row.store_group_id}`,
                state: { from: loc },
            };
        }},
        { name: 'name', title: 'Name', },
    ]);
    
    const [ buttons ] = useState([
        { 
            title: "New",
            to: () => {
                return {
                    pathname: '/workspace/storeGroups/add',
                    state: { from: loc },
                };
            }
        }
    ]);
    
    return (
        <EnhancedListPage
            title="Store Groups"
            columns={columns}
            buttons={buttons}
            findDataFnc={get_StoreGroups}
        />
    )
};

export default StoreGroupList;