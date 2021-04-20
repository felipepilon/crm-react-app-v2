import React, { useContext, useEffect } from 'react';
import { Box, Button, Container, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../contexts/WorkspaceState';
import SalesPanel from '../sales-view/SalesPanel';
import { Link as RouterLink } from 'react-router-dom';
import { Can } from '../../contexts/Can';

const WorkspaceHome = () => {
    const { setStatus } = useContext(WorkspaceStateContext);

    const loc = useLocation();
    const theme = useTheme();

    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container style={{display: 'flex', paddingTop: theme.spacing(2)}}>
            <Can I='read' a='SalesPanel'>
                <SalesPanel/>
            </Can>
            <Box
                width='20%'
                padding={1}
            >
                <Button fullWidth variant='contained' color='primary' href='#'
                    component={RouterLink} to={{
                        pathname: '/workspace/reserves/add',
                        state: { from: loc }
                    }}
                >
                    <FormattedMessage id='New Reserve'/>
                </Button>
            </Box>
        </Container>
    );
}
 
export default WorkspaceHome;