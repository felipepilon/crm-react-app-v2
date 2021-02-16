import { Box, Typography, TableCell, Tooltip, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { get_ReserveDetails } from '../../services/Reserve';
import { post_ReserveProduct } from '../../services/ReserveProduct';
import TableWrapper from '../../components/table2/TableWrapper';
import TableBodyWrapper from '../../components/table2/TableBodyWrapper';
import TableHeaderWrapper from '../../components/table2/TableHeaderWrapper';
import ColumnHeader from '../../components/table2/ColumnHeader';
import RowWrapper from '../../components/table2/RowWrapper';
import RowsWrapper from '../../components/table2/RowsWrapper';
import EnhancedTableCell from '../../components/table2/TableCell';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/DoneOutlineRounded';
import ActionConfirmDialog from './ActionConfirmDialog';

const Reserves = ({customer_id, loading, setLoading, setReservesLastUpdated, reservesLastUpdate}) => {
    const intl = useIntl();

    const [data, setData] = useState([]);
    const [confirmationDialog, setConfirmationDialog] = useState({});

    useEffect(() => {
        setLoading(true);
        loadData();
    // eslint-disable-next-line
    }, [customer_id, reservesLastUpdate])

    const message = loading ? 'Loading open reserves...' :
        data.length ? 'Open reserves' :
        'No open reserves';

    const loadData = () => {
        get_ReserveDetails({customer_id, status: "New"})
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    }

    const handleConfirmAction = (status, reserve) => {
        setLoading(true);
        setConfirmationDialog({});

        post_ReserveProduct({
            reserve_product_id: reserve.reserve_product_id,
            status
        })
        .then(() => {
            setReservesLastUpdated(new Date());
        })
    }

    return (
        <Box display='flex' flexDirection='column' marginTop={1} maxHeight='250px' overflow='auto'>
            <Typography variant='body1'><FormattedMessage id={message}/></Typography>
            {
                !loading && data.length ?
                <TableWrapper>
                    <TableBodyWrapper dense='dense'>
                        <TableHeaderWrapper>
                            <ColumnHeader title='Actions' align='center'/>
                            <ColumnHeader title='Reserve Date'/>
                            <ColumnHeader title='Product'/>
                            <ColumnHeader title='Description'/>
                            <ColumnHeader title='Color'/>
                            <ColumnHeader title='Size'/>
                            <ColumnHeader title='Quantity'/>
                            <ColumnHeader title='Store'/>
                            <ColumnHeader title='Salesman'/>
                        </TableHeaderWrapper>
                        <RowsWrapper>{
                            data.map((row) => {
                                return (
                                    <RowWrapper key={row.reserve_product_id}>
                                        <TableCell>
                                            <Tooltip title={intl.formatMessage({id: 'Close reserve'})}>
                                                <IconButton size='small' 
                                                    onClick={() => setConfirmationDialog({
                                                        status: 'Closed', reserve: row
                                                    })}
                                                >
                                                    <DoneIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={intl.formatMessage({id: 'Cancel reserve'})}>
                                                <IconButton size='small' 
                                                    onClick={() => setConfirmationDialog({
                                                        status: 'Canceled', reserve: row
                                                    })}
                                                >
                                                    <CancelIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <EnhancedTableCell value={row.reserve_date} format='datetime'/>
                                        <EnhancedTableCell value={row.product_code}/>
                                        <EnhancedTableCell value={row.product_desc}/>
                                        <EnhancedTableCell value={row.product_color_code}/>
                                        <EnhancedTableCell value={row.size}/>
                                        <EnhancedTableCell value={row.quantity}/>
                                        <EnhancedTableCell value={row.store_name}/>
                                        <EnhancedTableCell value={row.salesman_name}/>
                                    </RowWrapper>
                                )
                            })
                        }</RowsWrapper>
                    </TableBodyWrapper>
                </TableWrapper> : null
            }
            {
                confirmationDialog.status &&
                <ActionConfirmDialog
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
 
export default Reserves;