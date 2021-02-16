import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import EnhancedTable from '../table/EnhancedTable';
import { franchises as franchisesAPI } from '../../services/Franchise';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

const FranchiseList = () => {
    let [ data, setData ] = useState([]);
    
    const hist = useHistory();
    const location = useLocation();
    const intl = useIntl();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Franchises' });

        franchisesAPI({})
        .then(result => {
            setData(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (_rowId) => {
        const { franchiseId } = data[_rowId]

        hist.push(`/workspace/franchises/edit/${franchiseId}`, { from: location });
    };

    const handleCellClick = (colName, _rowId) => {
        const fnc = colName === '_edit' ? handleEdit :
            null;
        
        if (fnc)
            fnc(_rowId);
    };

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', icon: 'edit', },
        { name: 'cnpj', title: 'CNPJ', mask: 'cnpj', },
        { name: 'name', title: 'Name', },
        { name: 'city', title: 'City', },
        { name: 'addr1', title: 'Address 1', },
        { name: 'addr2', title: 'Address 2', },
        { name: 'addr3', title: 'Address 3', },
        { name: 'zip', title: 'ZIP', },
        { name: 'state', title: 'State', },
        { name: 'phone1', title: 'Phone 1', mask: 'phone', },
        { name: 'phone2', title: 'Phone 2', mask: 'phone', },
    ]);
    
    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='0'
            height='100%'
        >
            <Box padding={2}>
                <Typography variant='h6'>
                    <FormattedMessage id='Franchises'/>
                </Typography>
            </Box>
            <EnhancedTable
                columns={columns}
                data={data}
                handleCellClick={handleCellClick}
            />
        </Box>
    )
};

export default FranchiseList;