import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { get_ProductColors } from '../../../services/Product';

const ProductSearchColor = ({store_group_code, product_code, color, handleColorSelect}) => {
    const [ colors, setColors ] = useState([]);

    const theme = useTheme();
    
    useEffect(() => {
        get_ProductColors({store_group_code, product_code})
        .then(res => {
            setColors(res);
        });
    }, [store_group_code, product_code])

    const _handleColorSelect = (e, product_color_id) => {
        e.preventDefault();
        handleColorSelect(colors.find((col) => col.product_color_id === product_color_id));
    }
    
    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop={1}>
            <Typography variant='subtitle1'>
                <FormattedMessage id='Color'/>
            </Typography>
            <Box display='flex' width='100%' flexWrap='wrap' >
                {
                    colors.length ?
                    colors.map((col, i) => {
                        return (
                            <Button key={i} variant='contained' size='small' disableElevation
                                style={{marginRight: theme.spacing(1), marginTop: theme.spacing(1)}}
                                onClick={(e) => _handleColorSelect(e, col.product_color_id)}
                                color={col.product_color_id === color.product_color_id ? 'primary' : 'default'}
                            >
                                {col.product_color_desc}
                            </Button>
                        )
                    }) : null
                }
            </Box>
        </Box>
    );
}
 
export default ProductSearchColor;