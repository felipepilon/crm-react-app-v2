import { Box, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { get_ReserveProducts, put_ReserveProduct } from '../../../services/ReserveProduct';
import { AppStateContext } from '../../contexts/AppState';
import EnhancedTable from '../EnhancedTable';
import ReserveActionCellContent from './ReserveActionCellContent';
import ReserveActionDialog from './ReserveActionDialog';

const OpenReservesTable = ({customer, lastUpdate, setLastUpdate}) => {
    const { addStatus, removeStatus, setSucessSnack, setError } = useContext(AppStateContext);

    const match = useRouteMatch();

    const [data, setData] = useState([]);
    const [filters] = useState({ 
        customer_code: customer.customer_code,
        status: 'New', 
        _orderBy: ['reserve_date']
    });
    const [message, setMessage] = useState('');
    const [confirmationDialog, setConfirmationDialog] = useState({});

    const handleClose = ({row}) => {
        setConfirmationDialog({
            status: 'Closed',
            reserve: row
        });
    }

    const handleCancel = ({row}) => {
        setConfirmationDialog({
            status: 'Canceled',
            reserve: row
        });
    }
    
    const columns = [
        { key: '_action', title: 'Actions', value: (row) => {
            return (
                <ReserveActionCellContent row={row} 
                    handleClose={handleClose}
                    handleCancel={handleCancel}
                />
            );
        }},
        { key: 'reserve_date', title: 'Reserve Date', comp: 'datetime' },
        { key: 'product_code', title: 'Product' },
        { key: 'product_desc', title: 'Description' },
        { key: 'product_color_code', title: 'Color' },
        { key: 'size', title: 'Size' },
        { key: 'quantity', title: 'Quantity' },
        { key: 'store_name', title: 'Store' },
        { key: 'salesman_name', title: 'Salesman' }
    ]

    const handleConfirmAction = ({status, reserve}) => {
        const loadingStatus = status === 'Closed' ?
            'Closing reserve' : 'Canceling reserve';

        addStatus(loadingStatus);
        setConfirmationDialog({});

        put_ReserveProduct({
            ...match.params,
            reserve_product_id: reserve.reserve_product_id,
            params: { status }
        })
        .then(() => {
            setLastUpdate(new Date());
            removeStatus(loadingStatus);

            const snackMsg = status === 'Closed' ?
                'Reserve closed successfully' : 
                'Reserve canceled successfully';

            setSucessSnack(snackMsg);
        })
        .catch((err) => {
            removeStatus(loadingStatus);
            setError(err);
        });
    }

    useEffect(() => {
        setMessage(
        data.length ? 'Open reserves:' :
            'No open reserves'
        );
    }, [data.length]);

    return (
        <Box display='flex' flexDirection='column' marginTop={1} maxHeight='250px' overflow='auto'>
            {
                message &&
                <Typography variant='body1'><FormattedMessage id={message}/></Typography>
            }
            <EnhancedTable columns={columns} 
                dense hideDense hideNoData
                rowsPerPage={5} hidePaginationSinglePage
                loadingStatus='Loading open reserves'
                data={data} setData={setData} hideRowNo
                getDataFnc={get_ReserveProducts}
                filters={filters} noSaveFilter
                lastUpdate={lastUpdate}
            />
            {
                confirmationDialog.status &&
                <ReserveActionDialog
                    open={confirmationDialog.status ? true : false}
                    handleClose={() => setConfirmationDialog({})}
                    status={confirmationDialog.status}
                    reserve={confirmationDialog.reserve}
                    handleConfirm={handleConfirmAction}
                />
            }
        </Box>
    );
}
 
export default OpenReservesTable;