import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CheckIcon from '@material-ui/icons/Check';
import { get_ContactMsgPresets } from '../../../services/ContactMsgPreset';
import EnhancedTable from '../EnhancedTable/EnhancedTable';

const MsgPresetSelectionDialog = ({store_group_code, reasons, contact_via, open, setOpen, handleTextSelect}) => {
    const [ data, setData ] = useState([]);

    const handleRowClick = (row) => {
        handleTextSelect(row.text);
        setOpen(false);
    }

    const [ columns ] = useState([
        { 
            key: '_select', title: 'Select', comp: 'icon', 
            icon: CheckIcon, tipText: 'Use this message',
            click: handleRowClick
        },
        { key: 'msg_preset', title: 'Message Preset' },
        { key: 'text', title: 'Text' },
    ]);
    const [ filters ] = useState({
        active: true,
        reasons, contact_via
    });

    useEffect(() => {
        if (open) {
            get_ContactMsgPresets({store_group_code, params: {reasons, contact_via, active: true}})
            .then((res) => {
                setData(res);
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reasons, contact_via, open]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='lg' disableBackdropClick>
            <DialogTitle><FormattedMessage id='Message Presets'/></DialogTitle>
            <DialogContent>
                <EnhancedTable columns={columns}
                    data={data} setData={setData}
                    getDataFnc={get_ContactMsgPresets} 
                    filters={filters}
                    hideRowNo
                    hidePagination
                    dense hideDense
                />
            </DialogContent>
        </Dialog>
    );
}
 
export default MsgPresetSelectionDialog;