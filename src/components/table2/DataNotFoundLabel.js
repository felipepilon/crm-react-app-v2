import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

const DataNotFoundLabel = ({show}) => {
    return (
        <Fragment>{
            show &&
            <Typography variant='body2'><FormattedMessage id='No records found'/></Typography>
        }</Fragment>
    );
}
 
export default DataNotFoundLabel;