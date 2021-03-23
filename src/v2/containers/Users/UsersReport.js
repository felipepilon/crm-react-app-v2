import React from 'react';
import ReportPage from '../../components/ReportPage';
import { get_Users, get_User, post_User, put_User } from '../../../services/User';
import { useLocation } from 'react-router';

const title = 'Users';
const modelName = 'User';
const modelTitle = 'User';
const rowId = 'user_id';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'email', title: 'Email'},
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
                { key: 'email', title: 'Email', required: true },
                { key: 'first_name', title: 'First Name', required: true },
                { key: 'last_name', title: 'Last Name', required: true },
                { key: 'role', title: 'Role', comp: 'select', options: ['admin', 'salesman', 'manager'], intlPrefix: 'user.role.', required: true },
                { key: 'active',  title: 'Active', comp: 'checkbox', required: true }
            ]
        },
        {
            key: 'security',
            title: 'Security',
            fields: [
                { key: 'password_new', title: 'Password', comp: 'password', required: true },
                { key: 'password_confirm', title: 'Confirm Password', comp: 'password', required: true },
                { key: 'force_password_change', title: 'Force Password Change', comp: 'checkbox', required: true }
            ]
        }
    ]
}

const editSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'email', title: 'Email', comp: 'label' },
                { key: 'first_name',  title: 'First Name', required: true },
                { key: 'last_name',  title: 'Last Name', required: true },
                { key: 'role', title: 'Role', comp: 'select', options: ['admin', 'salesman', 'manager'], intlPrefix: 'user.role.', required: true, hideEmpty: true },
                { key: 'active',  title: 'Active', comp: 'checkbox', required: true }
            ]
        },
        {
            key: 'security',
            title: 'Security',
            fields: [
                { key: 'password_new', title: 'Password', comp: 'password', required: true },
                { key: 'password_confirm', title: 'Confirm Password', comp: 'password', required: true },
                { key: 'force_password_change', title: 'Force Password Change', comp: 'checkbox', required: true }
            ]
        }
    ]
}

const addValues = {
    active: true,
    force_password_change: true
}

const UsersReport = () => {
    const loc = useLocation();
    
    const columns = [
        { key: 'name', title: 'Name', value: (row) => `${row.first_name} ${row.last_name}` },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Role', comp: 'intl', intlPrefix: 'user.role.' },
        { key: 'active', title: 'Active', comp: 'checkbox' },
        { key: 'stores_link', title: 'Stores', value: 'Stores', comp: 'intlLink', to: (row) => `${loc.pathname}/${row.user_id}/stores` },
        { key: 'created_at', title: 'Created At', comp: 'datetime' },
        { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
        { key: 'updated_by', title: 'Updated By' }
    ]

    return (
        <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
            columns={columns} getDataFnc={get_Users} searchSchema={searchSchema}
            addSchema={addSchema} addValues={addValues} addFnc={post_User}
            editSchema={editSchema} editFnc={put_User}
            getFnc={get_User} rowId={rowId}
        />
    );
}
 
export default UsersReport;