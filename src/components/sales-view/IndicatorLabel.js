import React, { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';

const IndicatorLabel = (props) => {
    const { currency } = useContext(AppStateContext);
    
    return (
        <Box display='flex' flexDirection='column' flex='1'>
            <Typography variant='caption'>
                <FormattedMessage id={props.label}/>
            </Typography>
            <Typography variant='h6'>
                {
                    props.style === 'currency' ? 
                    // eslint-disable-next-line
                    <FormattedNumber style='currency' currency={currency} value={props.value}/> :
                    <FormattedNumber value={props.value}/>
                }
            </Typography>
        </Box>
    );
}
 
export default IndicatorLabel;