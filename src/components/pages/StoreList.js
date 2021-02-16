import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import EnhancedTable from '../table/EnhancedTable';
import { get_Stores } from '../../services/Store';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

const StoreList = () => {
    let [ data, setData ] = useState([]);
    const [ lastUpdate, setLastUpdate ] = useState(null);
    
    const hist = useHistory();
    const location = useLocation();
    const intl = useIntl();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Stores' });

        get_Stores({})
        .then((result) => {
            setData(result);
            setLastUpdate(new Date());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (rowIdx) => {
        const { store_id } = data[rowIdx]

        hist.push(`/workspace/stores/edit/${store_id}`, { from: location });
    };

    const handleCellClick = (colName, rowIdx) => {
        const fnc = colName === '_edit' ? handleEdit :
            null;
        
        if (fnc)
            fnc(rowIdx);
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
                    <FormattedMessage id='Stores'/>
                </Typography>
            </Box>
            <EnhancedTable
                columns={columns}
                data={data}
                fullHeight
                handleCellClick={handleCellClick}
                dataStatus={lastUpdate ? 'loaded' : 'loading'}
            />
        </Box>
    )
};

export default StoreList;