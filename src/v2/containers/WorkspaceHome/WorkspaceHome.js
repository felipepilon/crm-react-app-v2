import React, { useContext } from 'react';
import { Box, Button, Container, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
//import { Can } from '../../../contexts/Can';
//import SalesPanel from '../../../components/sales-view/SalesPanel';
import { Link as RouterLink } from 'react-router-dom';
import { WorkspaceContext } from '../../contexts/Workspace';
import AgendaSummaryView from '../../components/AgendaSummaryView';

const WorkspaceHome = () => {
    const { store_group_code } = useContext(WorkspaceContext)

    const loc = useLocation();
    const theme = useTheme();

    return (
        <Container style={{display: 'flex', paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2)}}>
            <AgendaSummaryView/>
            <Box width='20%' padding={1}>
                <Button fullWidth variant='contained' color='primary' href='#'
                    component={RouterLink} to={{
                        pathname: `/${store_group_code}/workspace/reserves/add`,
                        state: { ...loc.state, from: loc }
                    }}
                >
                    <FormattedMessage id='New Reserve'/>
                </Button>
            </Box>
        </Container>
    );
}
 
export default WorkspaceHome;