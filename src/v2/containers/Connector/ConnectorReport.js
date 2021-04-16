import React, { useState } from 'react';
import ReportPage from '../../components/ReportPage';
import { get_Stores } from '../../../services/Store';
import { get_Connector, get_Connectors, post_Connector, put_Connector } from '../../../services/Connector';
import { Fragment } from 'react';

const title = 'Connectors';
const modelName = 'Connector';
const modelTitle = 'Connector';
const rowId = 'user_id';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store Code'},
                { key: 'store_name', title: 'Store Name'}
            ]
        }
    ]
}

const addSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store', comp: 'select', required: true,
                        options: get_Stores, 
                        labelKey: 'name', 
                        getOptionsParams: { do_not_have_connector: true }
                },
                { key: 'active', title: 'Active', comp: 'checkbox', required: true },
                { key: 'c_job_profile_id', title: 'Job Profile', comp: 'select', required: true },
                { key: 'sync_frequecy', title: 'Sync Frequency (in seconds)', comp: 'number', required: true },
                { key: 'connection_string', title: 'Connection String', required: true },
                { key: 'diagnostic', title: 'Diagnostic', comp: 'checkbox', required: true }
            ]
        }
    ]
}

const editSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store', comp: 'select', 
                        options: get_Stores, 
                        labelKey: 'name', 
                        getOptionsParams: { do_not_have_connector: true },
                        readOnly: true
                },
                { key: 'active', title: 'Active', comp: 'checkbox', required: true },
                { key: 'c_job_profile_id', title: 'Job Profile', comp: 'select', required: true },
                { key: 'sync_frequecy', title: 'Sync Frequency (in seconds)', comp: 'number', required: true },
                { key: 'connection_string', title: 'Connection String', required: true },
                { key: 'diagnostic', title: 'Diagnostic', comp: 'checkbox', required: true }
            ]
        }
    ]
}

const filters = {
    orderBy: ['store_group_code']
}

const ConnectorReport = () => {
    const [ columns ] = useState([
        { key: 'store_group_code', title: 'Store Group Code' },
        { key: 'store_code', title: 'Store Code' },
        { key: 'store_name', title: 'Store Name' },
        { key: 'active', title: 'Active', comp: 'checkbox' },
        { key: 'stores_link', title: 'Generate Token', value: 'Generate Token', comp: 'intlLink', to: (row) => `/stores` },
        { key: 'created_at', title: 'Created At', comp: 'datetime' },
        { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
        { key: 'updated_by', title: 'Updated By' }
    ])

    return (
        <Fragment>
            <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
                columns={columns} getDataFnc={get_Connectors} searchSchema={searchSchema}
                addSchema={addSchema} addFnc={post_Connector}
                editSchema={editSchema} editFnc={put_Connector}
                getFnc={get_Connector} rowId={rowId} filters={filters}
            />
        </Fragment>
    );
}
 
export default ConnectorReport;