import { Link, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import { WorkspaceContext } from '../../contexts/Workspace';

const MenuItem = ({iconComp, to, title}) => {
    const { store_group_code } = useContext(WorkspaceContext);
    const intl = useIntl();
    const loc = useLocation();

    return (
        <Link component={LinkRouter} to={{
            pathname: `/${store_group_code}/workspace${to}`,
            state: {...loc.state, from: loc, filters: undefined }
        }}>
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
