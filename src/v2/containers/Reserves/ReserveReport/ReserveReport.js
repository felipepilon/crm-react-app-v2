import React from 'react';

const title = 'Reserves';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store' },
                { key: 'salesman_code', title: 'Salesman' },
                { key: 'customer_code', title: 'Customer' },
                { key: 'product_code', title: 'Product' }
            ]
        }
    ]
};

const filters = {
    orderBy: ['reserve_date']
};

const columns = [
    { key: 'store_code', title: 'store' },
    { key: 'customer_code', title: 'Customer' },
    { key: 'salesman_code', title: 'Salesman' },
    { key: '', title: '' },
    { key: '', title: '' },
    { key: '', title: '' },
    { key: '', title: '' },
    { key: '', title: '' },
    { key: '', title: '' }
]

const ReserveReport = () => {
    return (
        <div>Reserve Report</div>
    );
}
 
export default ReserveReport;