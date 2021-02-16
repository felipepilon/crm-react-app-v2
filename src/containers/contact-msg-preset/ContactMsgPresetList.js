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
import { get_ContactMsgPresets } from '../../services/ContactMsgPreset';
import ContactMsgPresetEditDialog from './ContactMsgPresetEditDialog';
import ContactMsgPresetAddDialog from './ContactMsgPresetAddDialog';
import { Can } from '../../contexts/Can';

const ContactMsgPresetList = ({contact_reason_id}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);

    useEffect(() => {
        get_ContactMsgPresets({contact_reason_id})
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_ContactMsgPresets({contact_reason_id})
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
                <ListPageTitle title='Message Presets'/>
                <Can I='add' a='ContactMsgPreset'>
                    <ListPageButton title='New Message Preset' handleClick={() => setOpenAdd(true)}/>
                </Can>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <Can I='update' a='ContactMsgPreset'>
                            <ColumnHeader title='Edit' align='center'/>
                        </Can>
                        <ColumnHeader title='Reason'/>
                        <ColumnHeader title='Contact Via'/>
                        <ColumnHeader title='Message Preset'/>
                        <ColumnHeader title='Default'/>
                        <ColumnHeader title='Active'/>
                        <ColumnHeader title='Created/Updated At'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.contact_msg_preset_id}>
                                    <Can I='update' a='ContactReason'>
                                        <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.contact_msg_preset_id)}/>
                                    </Can>
                                    <TableCell value={row.reason_description}/>
                                    <TableCell value={row.contact_via} format='intl'/>
                                    <TableCell value={row.msg_preset}/>
                                    <TableCell value={row.is_default} format='checkbox'/>
                                    <TableCell value={row.active} format='checkbox'/>
                                    <TableCell value={row.updated_at} format='datetime'/>
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
                <ContactMsgPresetEditDialog
                    contact_msg_preset_id={currentRowId}
                    contact_reason_id={contact_reason_id}
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
            {
                openAdd &&
                <ContactMsgPresetAddDialog
                    open={openAdd}
                    contact_reason_id={contact_reason_id}
                    handleClose={() => setOpenAdd(false)}
                    handleUpdated={handleDataUpdated}
                />
            }
        </ListPageWrapper>
    );
};

export default ContactMsgPresetList;