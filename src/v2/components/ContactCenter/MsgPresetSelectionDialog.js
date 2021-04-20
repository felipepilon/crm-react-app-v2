import { Dialog, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ColumnHeader from '../../../components/table2/ColumnHeader';
import DataNotFoundLabel from '../../../components/table2/DataNotFoundLabel';
import LoadingProgress from '../../../components/table2/LoadingProgress';
import RowsWrapper from '../../../components/table2/RowsWrapper';
import RowWrapper from '../../../components/table2/RowWrapper';
import TableBodyWrapper from '../../../components/table2/TableBodyWrapper';
import TableCell from '../../../components/table2/TableCell';
import TableHeaderWrapper from '../../../components/table2/TableHeaderWrapper';
import TableWrapper from '../../../components/table2/TableWrapper';
import CheckIcon from '@material-ui/icons/Check';
import { get_ContactMsgPresets } from '../../../services/ContactMsgPreset';
import LoadingAbsoluteBox from '../../../components/LoadingAbsoluteBox';

const MsgPresetSelectionDialog = ({store_group_code, reasons, contact_via, open, setOpen, handleTextSelect}) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        if (open) {
            get_ContactMsgPresets({store_group_code, params: {reasons, contact_via, active: true}})
            .then((res) => {
                setData(res);
                setLoading(false);
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reasons, contact_via, open]);

    const handleRowClick = (row) => {
        handleTextSelect(row.text);
        setOpen(false);
    }

    const showDataNotFound = !loading && !data.length;

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='lg' disableBackdropClick>
            <DialogTitle><FormattedMessage id='Message Presets'/></DialogTitle>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper>
                    <TableHeaderWrapper>
                        <ColumnHeader title='Message Preset'/>
                        <ColumnHeader title='Text'/>
                        <ColumnHeader title='Select' align='center'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        data.map((row) => {
                            return (
                                <RowWrapper key={row.contact_msg_preset_id}>
                                    <TableCell value={row.msg_preset}/>
                                    <TableCell value={row.text} wrap={true}/>
                                    <TableCell format='icon' Icon={CheckIcon} handleClick={() => handleRowClick(row)} tipText='Use this message'/>
                                </RowWrapper>
                            )
                        })
                    }</RowsWrapper>
                </TableBodyWrapper>
            </TableWrapper>
            <LoadingAbsoluteBox loading={loading}/>
        </Dialog>
    );
}
 
export default MsgPresetSelectionDialog;