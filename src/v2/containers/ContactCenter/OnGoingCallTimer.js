import React, { useEffect, useState } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import LabelMasks from '../../../utils/LabelMasks';

const OnGoingCallTimer = (props) => {
    const theme = useTheme();
    const [ currentDate, setCurrentDate ] = useState(new Date());
    
    useEffect(() => {
        if (!props.end_date)
        {
            setTimeout(() => {
                setCurrentDate(new Date());
            }, 1000)
        }
    // eslint-disable-next-line
    }, [props.end_date, currentDate]);

    const timerValue = props.start_date ?
        ((props.end_date && props.end_date.getTime()) || currentDate.getTime()) - props.start_date.getTime() :
        0;

    return (
        <Typography variant='h6' style={{margin: theme.spacing(1)}} >
            {
                LabelMasks.timer(timerValue / 1000)
            }
        </Typography>
    );
}
 
export default OnGoingCallTimer;