import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
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

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='lg' disableBackdropClick>
            <DialogTitle><FormattedMessage id='Message Presets'/></DialogTitle>
            <DialogContent>To do</DialogContent>
        </Dialog>
    );
}
 
export default MsgPresetSelectionDialog;