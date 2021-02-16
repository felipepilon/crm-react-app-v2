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
import { get_Customers } from '../../services/Customer';
import CustomerEditDialog from './CustomerEditDialog';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEditCustomer, setOpenEditCustomer] = useState(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);

    useEffect(() => {
        get_Customers()
        .then((res) => {
            setCustomers(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setCustomers([]);

        get_Customers()
        .then((res) => {
            setCustomers(res);
            setLoading(false);
        });
    };

    const handleCustomerUpdated = () => {
        handleRefreshList();
    }

    const handleEditLinkClick = (e, selCustId) => {
        e.preventDefault();
        setCurrentCustomerId(selCustId);
        setOpenEditCustomer(true);
    }

    const showDataNotFound = !loading && !customers.length
    
    return (
        <ListPageWrapper>
            <ListPageHeaderWrapper>
                <ListPageTitle title='Customers'/>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <ColumnHeader title='Edit'/>
                        <ColumnHeader title='CPF'/>
                        <ColumnHeader title='Name'/>
                        <ColumnHeader title='Email'/>
                        <ColumnHeader title='Phone 1'/>
                        <ColumnHeader title='Phone 2'/>
                        <ColumnHeader title='Date of Birth'/>
                        <ColumnHeader title='City'/>
                        <ColumnHeader title='Address 1'/>
                        <ColumnHeader title='Address 2'/>
                        <ColumnHeader title='Address 3'/>
                        <ColumnHeader title='ZIP'/>
                        <ColumnHeader title='State'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.customer_id}>
                                    <TableCell format='editIcon' dense={dense} handleClick={(e) => handleEditLinkClick(e, row.customer_id)}/>
                                    <TableCell value={row.cpf} format='masked' mask='cpf'/>
                                    <TableCell value={row.name}/>
                                    <TableCell value={row.email}/>
                                    <TableCell value={row.phone1} format='masked' mask='phone'/>
                                    <TableCell value={row.phone2} format='masked' mask='phone'/>
                                    <TableCell value={row.date_of_birth} format='date'/>
                                    <TableCell value={row.city}/>
                                    <TableCell value={row.addr1}/>
                                    <TableCell value={row.addr2}/>
                                    <TableCell value={row.addr3}/>
                                    <TableCell value={row.zip}/>
                                    <TableCell value={row.state}/>
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
                        count={customers.length}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
                <DenseSwitch dense={dense} setDense={setDense}/>
            </TableWrapper>
            {
                openEditCustomer &&
                <CustomerEditDialog
                    customer_id={currentCustomerId}
                    open={openEditCustomer}
                    handleClose={() => setOpenEditCustomer(false)}
                    handleCustomerUpdated={handleCustomerUpdated}
                />
            }
        </ListPageWrapper>
    );
}
 
export default CustomerList;