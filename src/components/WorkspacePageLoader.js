import React, { useContext } from 'react';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';
import { WorkspaceStateContext } from '../contexts/WorkspaceState';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const WorkspacePageLoader = () => {
    const { status } = useContext(WorkspaceStateContext)

    const classes = useStyles();
    
    const open = ["initiating", "loading",  ].includes(status)
    
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress />
        </Backdrop>
    );
};

export default WorkspacePageLoader;