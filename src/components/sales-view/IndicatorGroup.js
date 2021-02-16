import React from 'react';
import IndicatorWrapper from './IndicatorWrapper';
import { Typography, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import IndicatorLabel from './IndicatorLabel';

const IndicatorGroup = (props) => {
    return (
        <IndicatorWrapper>
            <Typography variant='subtitle1'>
                <FormattedMessage id={props.label}/>
            </Typography>
            <Box display='flex'>
                {
                    props.indicators.map((ind) => {
                        return (
                            <IndicatorLabel key={ind.label} label={ind.label} value={ind.value} style={ind.style}/>
                        )
                    })
                }
            </Box>
        </IndicatorWrapper>
    );
}
 
export default IndicatorGroup;