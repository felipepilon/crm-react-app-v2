import { Link, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link as LinkRouter } from 'react-router-dom';

const MenuItem = ({iconComp, to, title}) => {
    const intl = useIntl();
    
    return (
        <Link component={LinkRouter} to={to}>
            <ListItem button>
                {
                    iconComp &&
                    <ListItemIcon>{iconComp}</ListItemIcon>
                }
                <ListItemText primary={intl.formatMessage({id: title})}/>
            </ListItem>
        </Link>
    );
}
 
export default MenuItem;
