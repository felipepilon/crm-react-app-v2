import React from 'react';
import ReportPage from '../../components/ReportPage';
import { get_StoreGroups, get_StoreGroup, post_StoreGroup, put_StoreGroup } from '../../../services/StoreGroup';

const title = 'Store Groups';
const modelName = 'StoreGroup';
const modelTitle = 'Store Group';
const rowId = 'store_group_code';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_group_code', title: 'Store Group Code'},
                { key: 'name', title: 'Name'}
            ]
        }
    ]
}

const addSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_group_code', title: 'Store Group Code', required: true },
                { key: 'name', title: 'Name', required: true }
            ]
        }
    ]
}

const editSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_group_code', title: 'Store Group Code', comp: 'label' },
                { key: 'name', title: 'Name', required: true }
            ]
        }
    ]
}
    
const columns = [
    { key: 'store_group_code', title: 'Store Group Code' },
    { key: 'name', title: 'Name' },
    { key: 'created_at', title: 'Created At', comp: 'datetime' },
    { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
    { key: 'updated_by', title: 'Updated By' }
]

const filters = {
    orderBy: ['store_group_code']
}

const StoreGroupReport = () => {
    return (
        <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
            columns={columns} getDataFnc={get_StoreGroups} searchSchema={searchSchema}
            addSchema={addSchema} addFnc={post_StoreGroup}
            editSchema={editSchema} editFnc={put_StoreGroup}
            getFnc={get_StoreGroup} rowId={rowId} filters={filters}
        />
    );
}
 
export default StoreGroupReport;