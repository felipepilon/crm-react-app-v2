import React, { useEffect, useState } from 'react';
import ListPageHeaderWrapper from '../../components/list-page/ListPageHeaderWrapper';
import ListPageTitle from '../../components/list-page/ListPageTitle';
import ListPageWrapper from '../../components/list-page/ListPageWrapper';
import ListPageRefreshButton from '../../components/list-page/ListPageRefreshButton';
import TableWrapper from '../../components/table2/TableWrapper';
import DataNotFoundLabel from '../../components/table2/DataNotFoundLabel';
import TableBodyWrapper from '../../components/table2/TableBodyWrapper';
import TableHeaderWrapper from '../../components/table2/TableHeaderWrapper';
import ColumnHeader from '../../components/table2/ColumnHeader';
import RowsWrapper from '../../components/table2/RowsWrapper';
import RowWrapper from '../../components/table2/RowWrapper';
import TableCell from '../../components/table2/TableCell';
import LoadingProgress from '../../components/table2/LoadingProgress';
import Pagination from '../../components/table2/Pagination';
import DenseSwitch from '../../components/table2/DenseSwitch';
import { get_ReserveDetails } from '../../services/Reserve';
import { useLocation } from 'react-router-dom';
import ListPageButtonLink from '../../components/list-page/ListPageButtonLink';

const ReserveList = () => {
    const loc = useLocation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');

    useEffect(() => {
        get_ReserveDetails()
        .then((res) => {
            console.log('res', res)
            setData(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_ReserveDetails()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    };

    const showDataNotFound = !loading && !data.length
    
    return (
        <ListPageWrapper>
            <ListPageHeaderWrapper>
                <ListPageTitle title='Reserves'/>
                <ListPageButtonLink title='New Reserve' to={{
                    pathname: `${loc.pathname}/add`,
                    state: { from: loc }
                }}/>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <ColumnHeader title='Reserve Date'/>
                        <ColumnHeader title='Store'/>
                        <ColumnHeader title='Customer'/>
                        <ColumnHeader title='Salesman'/>
                        <ColumnHeader title='Product'/>
                        <ColumnHeader title='Description'/>
                        <ColumnHeader title='Color'/>
                        <ColumnHeader title='Size'/>
                        <ColumnHeader title='Quantity'/>
                        <ColumnHeader title='Status'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.reserve_product_id}>
                                    <TableCell value={row.reserve_date} format='datetime'/>
                                    <TableCell value={row.store_name}/>
                                    <TableCell value={row.customer_name}/>
                                    <TableCell value={row.salesman_name}/>
                                    <TableCell value={row.product_code}/>
                                    <TableCell value={row.product_desc}/>
                                    <TableCell value={row.product_color_code}/>
                                    <TableCell value={row.size}/>
                                    <TableCell value={row.quantity}/>
                                    <TableCell value={row.status} format='intl'/>
                                </RowWrapper>
                            )
                        })
                    }</RowsWrapper>
                </TableBodyWrapper>
                {
                    !loading &&
                    <Pagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={data.length}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
                <DenseSwitch dense={dense} setDense={setDense}/>
            </TableWrapper>
        </ListPageWrapper>
    );
};

export default ReserveList;