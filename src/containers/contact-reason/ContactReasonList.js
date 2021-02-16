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
import { get_ContactReasons } from '../../services/ContactReason';
import ContactReasonEditDialog from './ContactReasonEditDialog';
import StoreGroupAddDialog from './ContactReasonAddDialog';
import { Can } from '../../contexts/Can';
import { useLocation } from 'react-router-dom';

const ContactReasonList = () => {
    const loc = useLocation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);

    useEffect(() => {
        get_ContactReasons()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_ContactReasons()
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
                <ListPageTitle title='Contact Reasons'/>
                <Can I='add' a='ContactReason'>
                    <ListPageButton title='New Contact Reason' handleClick={() => setOpenAdd(true)}/>
                </Can>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <Can I='update' a='ContactReason'>
                            <ColumnHeader title='Edit' align='center'/>
                        </Can>
                        <ColumnHeader title='Store Group'/>
                        <ColumnHeader title='Reason'/>
                        <ColumnHeader title='Reason Type'/>
                        <ColumnHeader title='Active'/>
                        <ColumnHeader title='Created/Updated At'/>
                        <ColumnHeader title='Message Presets'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.contact_reason_id}>
                                    <Can I='update' a='ContactReason'>
                                        <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.contact_reason_id)}/>
                                    </Can>
                                    <TableCell value={row.store_group_name}/>
                                    <TableCell value={row.reason_description}/>
                                    <TableCell value={row.reason_type} format='intl'/>
                                    <TableCell value={row.active} format='checkbox'/>
                                    <TableCell value={row.updated_at} format='datetime'/>
                                    <TableCell value='Message Presets' format='intlLink' to={{
                                        pathname: `${loc.pathname}/${row.contact_reason_id}/messagePresets`,
                                        state: { from: loc }
                                    }}/>
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
                <ContactReasonEditDialog
                    contact_reason_id={currentRowId}
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

export default ContactReasonList;