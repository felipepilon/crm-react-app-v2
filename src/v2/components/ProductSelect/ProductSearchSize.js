import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { get_ProductSizeGrid } from '../../../services/Product';

const ProductSearchSize = ({store_group_code, product_code, handleSizeSelect, size}) => {
    const [ sizes, setSizes ] = useState([]);

    const theme = useTheme();
    
    useEffect(() => {
        get_ProductSizeGrid({store_group_code, product_code})
        .then(res => {
            let i = 1;
            const newSizes = [];
            for(; i <= 50; i++)
            {
                if (res[`s${i}`])
                    newSizes.push(res[`s${i}`]);
            }

            setSizes(newSizes);
        });
    }, [store_group_code, product_code])

    const _handleSizeSelect = (e, size) => {
        e.preventDefault();
        handleSizeSelect(size);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            marginTop={1}
        >
            <Typography variant='subtitle1'>
                <FormattedMessage id='Size'/>
            </Typography>
            <Box
                display='flex'
                width='100%'
                flexWrap='wrap'
            >
                {
                    sizes.length ?
                    sizes.map((siz, i) => {
                        return (
                            <Button 
                                key={i}
                                style={{marginRight: theme.spacing(1), marginTop: theme.spacing(1)}}
                                onClick={(e) => _handleSizeSelect(e, siz)}
                                variant='contained'
                                disableElevation
                                color={siz === size ? 'primary' : 'default'}
                                size='small'
                            >
                                {siz}
                            </Button>
                        )
                    }) : null
                }
            </Box>
        </Box>
    );
}
 
export default ProductSearchSize;