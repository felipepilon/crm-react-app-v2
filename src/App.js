import React, { useContext, useEffect } from 'react';
import AppRouter from './AppRouter';
import { Box } from '@material-ui/core';
import FullPageLoader from './v2/components/FullPageLoader';
import AppStateDialog from './v2/components/AppStateDialog';
import { AppStateContext } from './v2/contexts/AppState';
import { AuthContext } from './contexts/Auth';
import SuccessSnack from './v2/components/SuccessSnack';

const loadingStatus = '_App';

const App = () => {
  const { addStatus, removeStatus } = useContext(AppStateContext);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
  if (loading)
    addStatus(loadingStatus)
  else
    removeStatus(loadingStatus);
  // eslint-disable-next-line
  }, [loading]);

  return (
    <Box
      minHeight='100vh'
      height='100vh'
    >
      { !loading && <AppRouter/> }
      <FullPageLoader/>
      <AppStateDialog/>
      <SuccessSnack/>
    </Box>
  )
}

export default App;
