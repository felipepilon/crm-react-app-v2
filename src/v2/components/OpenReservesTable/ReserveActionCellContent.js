import React from 'react';
import { Fragment } from 'react';
import DoneIcon from '@material-ui/icons/DoneOutlineRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton, Tooltip } from '@material-ui/core';
import { useIntl } from 'react-intl';

const ReserveActionCellContent = ({row, handleCancel, handleClose}) => {
    const intl = useIntl();

    return (
        <Fragment>
            <Tooltip title={intl.formatMessage({id: 'Close reserve'})}>
                <IconButton size='small' onClick={() => handleClose({row})}>
                    <DoneIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={intl.formatMessage({id: 'Cancel reserve'})}>
                <IconButton size='small' onClick={() => handleCancel({row})}>
                    <CancelIcon/>
                </IconButton>
            </Tooltip>
        </Fragment>
    );
}
 
export default ReserveActionCellContent;