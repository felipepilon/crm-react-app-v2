import { Button, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

const ListPageButtonLink = ({title, to}) => {
    const theme = useTheme();

    return (
        <Button variant='contained' color='primary' style={{marginLeft: theme.spacing(1)}} href='#'
            component={RouterLink} to={to}
        >
            <FormattedMessage id={title}/>
        </Button>
    );
}
 
export default ListPageButtonLink;