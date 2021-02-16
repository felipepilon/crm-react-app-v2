import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ListPageTitle = ({title}) => {
    return (
        <Typography variant='h6' style={{flex: '1'}}>
            <FormattedMessage id={title}/>
        </Typography>
    );
}
 
export default ListPageTitle;