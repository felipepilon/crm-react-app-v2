import React, { useState } from 'react';
import ReportPage from '../../components/ReportPage';
import { get_Stores } from '../../../services/Store';
import { get_ConnJobProfiles } from '../../../services/ConnJobProfiles';
import { get_ConnUser, get_ConnUsers, post_ConnUser, put_ConnUser } from '../../../services/ConnUser';
import { Fragment } from 'react';
import GenerateTokenDialog from '../../components/GenerateTokenDialog';

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
                { key: 'c_job_profile_id', title: 'Job Profile', comp: 'select', required: true,
                    options: get_ConnJobProfiles, 
                    labelKey: 'profile_name', 
                    getOptionsParams: { do_not_have_connector: true }
                },
                { key: 'sync_frequency', title: 'Sync Frequency (in seconds)', comp: 'number', required: true },
                { key: 'connection_string', title: 'Connection String', required: true },
                { key: 'diagnostic', title: 'Diagnostic', comp: 'checkbox', required: true },
                { key: 'active', title: 'Active', comp: 'checkbox', required: true }
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
                { key: 'c_job_profile_id', title: 'Job Profile', comp: 'select', required: true,
                    options: get_ConnJobProfiles, 
                    labelKey: 'profile_name', 
                    getOptionsParams: { do_not_have_connector: true }
                },
                { key: 'sync_frequency', title: 'Sync Frequency (in seconds)', comp: 'number', required: true },
                { key: 'connection_string', title: 'Connection String', required: true },
                { key: 'diagnostic', title: 'Diagnostic', comp: 'checkbox', required: true },
                { key: 'active', title: 'Active', comp: 'checkbox', required: true }
            ]
        }
    ]
}

const filters = {
    orderBy: ['store_group_code', 'store_code']
}

const addValues = {
    active: true,
    sync_frequency: 60,
    connection_string: 'Server=.;Database=LINXPOS;User Id=sa;Password=;',
    diagnostic: false
}

const ConnectorReport = () => {
    const [ genTokenRow, setGenerateTokenRow ] = useState(null);
    const [ columns ] = useState([
        { key: 'store_code', title: 'Store Code' },
        { key: 'store_name', title: 'Store Name' },
        { key: 'profile_name', title: 'Job Profile' },
        { key: 'system', title: 'System' },
        { key: 'sync_frequency', title: 'Sync Frequency (in seconds)' },
        { key: 'connection_string', title: 'Connection String' },
        { key: 'diagnostic', title: 'Diagnostic', comp: 'checkbox' },
        { key: 'gen_token_link', title: 'Generate Token', value: 'Generate Token', comp: 'intlFnc', fnc: setGenerateTokenRow },
        { key: 'active', title: 'Active', comp: 'checkbox' },
        { key: 'created_at', title: 'Created At', comp: 'datetime' },
        { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
        { key: 'updated_by', title: 'Updated By' }
    ]);

    

    return (
        <Fragment>
            <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
                columns={columns} getDataFnc={get_ConnUsers} searchSchema={searchSchema}
                addSchema={addSchema} addFnc={post_ConnUser} addValues={addValues}
                editSchema={editSchema} editFnc={put_ConnUser}
                getFnc={get_ConnUser} rowId={rowId} filters={filters}
            />
            <GenerateTokenDialog
                connUser={genTokenRow}
                open={Boolean(genTokenRow)}
                handleClose={() => setGenerateTokenRow(null)}
            />
        </Fragment>
    );
}
 
export default ConnectorReport;