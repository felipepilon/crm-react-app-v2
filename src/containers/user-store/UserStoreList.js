import React, { useEffect, useState } from 'react';
import ListPageHeaderWrapper from '../../components/list-page/ListPageHeaderWrapper';
import ListPageTitle from '../../components/list-page/ListPageTitle';
import ListPageWrapper from '../../components/list-page/ListPageWrapper';
import ListPageRefreshButton from '../../components/list-page/ListPageRefreshButton';
import ListPageButton from '../../components/list-page/ListPageButton';
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
import { get_UserStores } from '../../services/UserStore';
import UserStoreEditDialog from './UserStoreEditDialog';
import UserStoreAddDialog from './UserStoreAddDialog';

const UserStoreList = ({user_id}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);

    useEffect(() => {
        get_UserStores({user_id})
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    // eslint-disable-next-line
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_UserStores({user_id})
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    };

    const handleDataUpdated = () => {
        handleRefreshList();
    }

    const handleEditLinkClick = (selectedId) => {
        setCurrentRowId(selectedId);
        setOpenEdit(true);
    }

    const showDataNotFound = !loading && !data.length;

    return (
        <ListPageWrapper>
            <ListPageHeaderWrapper>
                <ListPageTitle title='User Stores'/>
                <ListPageButton title='New' handleClick={() => setOpenAdd(true)}/>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <ColumnHeader title='Edit' align='center'/>
                        <ColumnHeader title='User'/>
                        <ColumnHeader title='Email'/>
                        <ColumnHeader title='Store'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.user_store_id}>
                                    <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.user_store_id)}/>
                                    <TableCell value={row.user_name}/>
                                    <TableCell value={row.user_email}/>
                                    <TableCell value={row.store_name}/>
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
            {
                openEdit &&
                <UserStoreEditDialog
                    user_store_id={currentRowId}
                    user_id={user_id}
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
            {
                openAdd &&
                <UserStoreAddDialog
                    open={openAdd}
                    user_id={user_id}
                    handleClose={() => setOpenAdd(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
        </ListPageWrapper>
    );
};

export default UserStoreList;