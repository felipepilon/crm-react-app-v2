import React, { Fragment } from 'react';
import { Typography, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveProductData from './ReserveProductData';

const ReserveProductShow = (props) => {
    const theme = useTheme();

    return (
        <Fragment>
            <Box
                display='flex'
                justifyContent='center'
            >
                <Typography variant='h6'>
                    <FormattedMessage id='Products' />
                </Typography>
            </Box>
            {
                props.products.length ?
                <ReserveProductData products={props.products}/> :
                <Typography variant='body1' style={{marginTop: theme.spacing(1)}}>
                    <FormattedMessage id='Inform products to reserve'/>
                </Typography>
            }
        </Fragment>
    );
};
 
export default ReserveProductShow;