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
import { get_Users } from '../../services/User';
import UserEditDialog from './UserEditDialog';
import UserAddDialog from './UserAddDialog';
import { useLocation } from 'react-router-dom';
import { Can } from '../../contexts/Can';
import ConnUserConfigDialog from './ConnUserConfigDialog';
import AccessTokenDialog from './AccessTokenDialog'

const UserList = () => {
    const loc = useLocation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [connConfig, setConnConfig] = useState(null);
    const [acessTokenDialog, setAcessTokenDialog] = useState(null);
    const [currentRowId, setCurrentRowId] = useState(null);


    useEffect(() => {
        get_Users()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_Users()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    };

    const handleUserUpdated = () => {
        handleRefreshList();
    }

    const handleEditLinkClick = (selCustId) => {
        setCurrentRowId(selCustId);
        setOpenEdit(true);
    }

    const showDataNotFound = !loading && !data.length
    
    return (
        <ListPageWrapper>
            <ListPageHeaderWrapper>
                <ListPageTitle title='Users'/>
                <Can I='add' a='User'>
                    <ListPageButton title='New User' handleClick={() => setOpenAdd(true)}/>
                </Can>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <Can I='edit' a='User'>
                            <ColumnHeader title='Edit'/>
                        </Can>
                        <ColumnHeader title='Name'/>
                        <ColumnHeader title='Email'/>
                        <ColumnHeader title='Role'/>
                        <ColumnHeader title='Active'/>
                        <ColumnHeader title='Created At'/>
                        <ColumnHeader title='Store Groups'/>
                        <ColumnHeader title='Stores'/>
                        <Can I='edit' a='ConnectorUser'>
                            <ColumnHeader title='Connector Configurations'/>
                        </Can>
                        <Can I='edit' a='ConnectorUser'>
                            <ColumnHeader title='Access Token'/>
                        </Can>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.user_id}>
                                    <Can I='edit' a='User'>
                                        <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.user_id)}/>
                                    </Can>
                                    <TableCell value={row.name}/>
                                    <TableCell value={row.email}/>
                                    <TableCell value={row.role} format='intl' intlPrefix='user.role.'/>
                                    <TableCell value={row.active} format='checkbox'/>
                                    <TableCell value={row.created_at} format='datetime'/>
                                    <TableCell value='Store Groups' format='intlLink' to={{
                                        pathname: `${loc.pathname}/${row.user_id}/storeGroups`,
                                        state: { from: loc }
                                    }}/>
                                    <TableCell value='Stores' format='intlLink' to={{
                                        pathname: `${loc.pathname}/${row.user_id}/stores`,
                                        state: { from: loc }
                                    }}/>
                                    <Can I='edit' a='ConnectorUser'>
                                        <TableCell value={row.role === 'Connector' ? 'Connector Configurations' : ''} format='intlAction' handleClick={() => setConnConfig(row.user_id)}/>
                                    </Can>
                                    <Can I='edit' a='ConnectorUser'>
                                        <TableCell value={row.role === 'Connector' ? 'Access Token' : ''} format='intlAction' handleClick={() => setAcessTokenDialog(row.user_id)}/>
                                    </Can>
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
                <UserEditDialog
                    user_id={currentRowId}
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    handleUpdated={handleUserUpdated}
                />
            }
            {
                openAdd &&
                <UserAddDialog
                    open={openAdd}
                    handleClose={() => setOpenAdd(false)}
                    handleUpdated={handleUserUpdated}
                />
            }
            {
                connConfig &&
                <ConnUserConfigDialog 
                    open={connConfig ? true : false}
                    user_id={connConfig} 
                    handleClose={() => setConnConfig(null)}
                />
            }
            {
                acessTokenDialog &&
                <AccessTokenDialog 
                    open={acessTokenDialog ? true : false}
                    user_id={acessTokenDialog} 
                    handleClose={() => setAcessTokenDialog(null)}
                />
            }
        </ListPageWrapper>
    );
};

export default UserList;