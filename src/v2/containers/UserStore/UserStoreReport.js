import React, { useState } from 'react';
import ReportPage from '../../components/ReportPage';
import { get_User, get_User_Stores, post_User_Store } from '../../../services/User';
import { get_Stores } from '../../../services/Store';
import { useRouteMatch } from 'react-router';

const title = 'User Stores';
const modelName = 'UserStore';
const modelTitle = 'User Store';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store Code' },
                { key: 'store_name', title: 'Store Name' }
            ]
        }
    ]
}

const columns = [
    { key: 'email', title: 'Email' },
    { key: 'user_name', title: 'User Name' },
    { key: 'store_code', title: 'Store Code' },
    { key: 'store_name', title: 'Store Name' },
    { key: 'created_at', title: 'Created At', comp: 'datetime' },
    { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
    { key: 'updated_by', title: 'Updated By' }
]

const UserStoreReport = () => {
    const match = useRouteMatch();

    const [ addSchema ] = useState({
        fieldGroups: [
            {
                key: 'main',
                fields: [
                    { key: 'email', title: 'Email', comp: 'label', 
                        value: get_User,
                        getValueParams: { user_id: match.params.user_id }
                    },
                    { key: 'store_code', title: 'Store', comp: 'select', 
                        options: get_Stores, 
                        labelKey: 'name', 
                        getOptionsParams: { not_assigned_to_id: match.params.user_id}
                    }
                ]
            }
        ]
    });

    return (
        <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
            columns={columns} getDataFnc={get_User_Stores} searchSchema={searchSchema}
            addSchema={addSchema} addFnc={post_User_Store}
            //editSchema={editSchema} editFnc={put_StoreGroup}
            //getFnc={get_StoreGroup} rowId={rowId}
        />
    );
}
 
export default UserStoreReport;