import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import EnhancedTable from '../table/EnhancedTable';
import RefreshIcon from '@material-ui/icons/Refresh';
import EnhancedButtonLink from './EnhancedButtonLink';

const EnhancedListPage = (props) => {
    const intl = useIntl();
    const theme = useTheme();
    
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const findData = () => {
        props.findDataFnc(props.findDataParams)
        .then((res) => {
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 500);
        });
    }

    const handleRefreshClick = () => {
        setLoading(true);
        findData();
    }

    useEffect(() => {
        document.title = intl.formatMessage({ id: props.title });

        if (!data)
            findData();
        else
            setLoading(false);
    // eslint-disable-next-line
    }, []);

    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='0'
            height='100%'
        >
            <Box display='flex' padding={2}>
                <Typography variant='h6' style={{flex: '1'}}>
                    <FormattedMessage id={props.title}/>
                </Typography>
                {
                    props.buttons &&
                    props.buttons.map((btn, i) => {
                        return (
                            <EnhancedButtonLink key={i} to={btn.to} title={btn.title}/>
                        )
                    })
                }
                <Button variant='contained' color='primary' style={{marginLeft: theme.spacing(1)}} onClick={handleRefreshClick}>
                    <RefreshIcon/>
                </Button>
            </Box>
            <EnhancedTable
                columns={props.columns}
                data={data}
                fullHeight
                loading={loading}
            />
        </Box>
    );
}
 
export default EnhancedListPage;