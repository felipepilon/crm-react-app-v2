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
import { get_StoreGroups } from '../../services/StoreGroup';
import StoreGroupEditDialog from './StoreGroupEditDialog';
import StoreGroupAddDialog from './StoreGroupAddDialog';
import { Can } from '../../contexts/Can';

const StoreGroupList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);

    useEffect(() => {
        get_StoreGroups()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_StoreGroups()
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
                <ListPageTitle title='Store Groups'/>
                <Can I='add' a='StoreGroup'>
                    <ListPageButton title='New Store Group' handleClick={() => setOpenAdd(true)}/>
                </Can>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <Can I='update' a='StoreGroup'>
                            <ColumnHeader title='Edit' align='center'/>
                        </Can>
                        <ColumnHeader title='Name'/>
                        <ColumnHeader title='Created At'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.store_group_id}>
                                    <Can I='update' a='StoreGroup'>
                                        <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.store_group_id)}/>
                                    </Can>
                                    <TableCell value={row.name}/>
                                    <TableCell value={row.created_at} format='datetime'/>
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
                <StoreGroupEditDialog
                    store_group_id={currentRowId}
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
            {
                openAdd &&
                <StoreGroupAddDialog
                    open={openAdd}
                    handleClose={() => setOpenAdd(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
        </ListPageWrapper>
    );
};

export default StoreGroupList;