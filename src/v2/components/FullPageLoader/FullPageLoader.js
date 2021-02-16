import React, { useContext } from 'react';
import { CircularProgress, Backdrop, useTheme, Typography } from '@material-ui/core';
import { AppStateContext } from '../../contexts/AppState';
import { FormattedMessage } from 'react-intl';

const FullPageLoader = () => {
    const { statusStack } = useContext(AppStateContext);

    const theme = useTheme();

    const open = Boolean(statusStack.length);
    
    return (
        <Backdrop open={open} style={{
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CircularProgress/>
            {
                open &&
                statusStack.map((sts) => 
                    <Typography key={sts} variant='body1'>
                        <FormattedMessage id={sts}/>
                    </Typography>    
                )
            }
        </Backdrop>
    );
};

export default FullPageLoader;