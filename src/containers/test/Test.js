import { Box, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { get_Test } from '../../services/Test';

const Test = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        get_Test()
        .then((res) => {
            console.log('res', res)
            setData(res);
        })
    }, [])

    return (
        <Box>
            <Typography variant='subtitle1'>Teste</Typography>
            {
                data.map((row, i) => {
                    return (
                        <Paper style={{margin: '5px'}}>
                            <Typography variant='subtitle1'>Index: {i}</Typography>
                            <Typography variant='body1'>ttmp_tz</Typography>
                            <FormattedDate value={row.ttmp_rg}/> <FormattedTime value={row.ttmp_rg}/>
                            <Typography variant='body1'>ttmp_rg</Typography>
                            <FormattedDate value={row.ttmp_rg}/> <FormattedTime value={row.ttmp_rg}/>
                            <Typography variant='body1'>dt</Typography>
                            <FormattedDate value={row.dt}/> <FormattedTime value={row.dt}/>
                            <Typography variant='body1'>tm_rg</Typography>
                            <FormattedTime value={row.tm_rg}/>
                            <Typography variant='body1'>tm_tz</Typography>
                            <FormattedTime value={row.tm_tz}/>
                        </Paper>
                    )
                })
            }
        </Box>
    );
}
 
export default Test;