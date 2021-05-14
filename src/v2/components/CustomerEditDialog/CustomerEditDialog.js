import React from 'react';
import { get_Customer, put_Customer } from '../../../services/Customer';
import EditDialog from '../EditDialog';

const modelTitle = 'Customer';

const schema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'customer_code', title: 'Customer Code', type: 'label' },
                { key: 'name', title: 'Name', required: true },
                { key: 'cpf', title: 'CPF', mask: 'cpf', required: true },
                { key: 'date_of_birth', title: 'Date of Birth', type: 'date' },
                { key: 'email', title: 'Email' },
                { key: 'phone1', title: 'Phone 1', mask: 'phone' },
                { key: 'phone2', title: 'Phone 2', mask: 'phone' },
                { key: 'zip', title: 'ZIP', mask: 'zip' },
                { key: 'addr_1', title: 'Address 1' },
                { key: 'addr_2', title: 'Address 2' },
                { key: 'addr_3', title: 'Address 3' },
                { key: 'city', title: 'City' },
                { key: 'state', title: 'State' }
            ]
        }
    ]
};

const CustomerEditDialog = ({customer, open, handleClose, handleCustomerUpdated}) => {

    return (
        <EditDialog
            open={open} 
            handleClose={handleClose}
            modelTitle={modelTitle} 
            schema={schema}
            handleSubmit={handleCustomerUpdated}
            rowId='customer_id'
            values={customer}
            getFnc={get_Customer}
            editFnc={put_Customer}
        />
    );
}
 
export default CustomerEditDialog;