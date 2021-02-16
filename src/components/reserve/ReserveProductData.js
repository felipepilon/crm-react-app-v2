import React, { Fragment } from 'react';
import { Typography, Paper, useTheme } from '@material-ui/core';

const ReserveProductData = (props) => {
    const theme = useTheme();

    if (!props.products || !props.products.length)
        return null;

    return (
        <Fragment>
            {
                props.products.map((prod, i) => {
                    return (
                        <Paper
                            key={i}
                            style={{
                                marginTop: theme.spacing(1),
                                display: 'flex', 
                                alignItems: 'center',
                                padding: theme.spacing(1),
                            }}
                        >
                            <Typography variant='body1'>
                                {`${prod.product.product_code} - ${prod.product.product_desc}`}
                                {prod.product.has_colors ? ` - ${prod.color.product_color_desc}` : ''}
                                {prod.product.size_grid_id ? ` - ${prod.size}` : ''}
                                {` - ${prod.quantity}`}
                            </Typography>
                        </Paper>
                    )
                })
            }
        </Fragment>
    );
}
 
export default ReserveProductData;