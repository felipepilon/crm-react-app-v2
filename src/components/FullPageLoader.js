import React, { useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { AppStateContext } from '../contexts/AppState';

const FullPageLoader = () => {
    const { setStatus } = useContext(AppStateContext)

    useEffect(() => {
      setTimeout(() => {
          console.log('fechando')
          setStatus('');
      }, 2000);
    })

    return <Fragment></Fragment>
    
    /*return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress />
        </Backdrop>
    );*/
};

export default FullPageLoader;