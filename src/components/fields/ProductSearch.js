import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@material-ui/core';
import ProductSearchCode from './ProductSearchCode';
import ProductSearchSize from './ProductSearchSize';
import { FormattedMessage } from 'react-intl';
import ProductSearchColor from './ProductSearchColor';
import QuantityInput from './QuantityInput';

const ProductSearch = ({products, handleAddProduct, store_group_id}) => {
    const [ product, setProduct ] = useState({});
    const [ productCode, setProductCode ] = useState('');
    const [ size, setSize ] = useState('');
    const [ color, setColor ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ errorMsg, setErrorMsg ] = useState('');

    const theme = useTheme();

    const handleAddClick = (e) => {
        e.preventDefault();

        if (products.find((p) => 
            p.product.product_id === product.product_id && 
            (!p.product.size_grid_id || p.size === size)
        )) {
            setErrorMsg('Already added');
            return;
        }

        handleAddProduct({product, size, color, quantity})
        setProduct({});
        setProductCode('');
    }

    const handleClearClick = (e) => {
        e.preventDefault();
        setProduct({});
        setProductCode('');
    }

    useEffect(() => {
        setSize('');
        setColor({});
        setErrorMsg('');
        setQuantity(1);
    }, [product])
    
    const addEnabled = product && product.product_id &&
        (!product.size_grid_id || size) &&
        (!product.has_colors || color.product_color_id) &&
        (quantity > 0)

    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            {
                errorMsg ?
                <Typography variant='body1' color='error' style={{padding: theme.spacing(1)}}>
                    <FormattedMessage id={errorMsg}/>
                </Typography> :
                null
            }
            <ProductSearchCode 
                handleProductSelect={setProduct}
                productCode={productCode}
                setProductCode={setProductCode}
                store_group_id={store_group_id}
            />
            {
                product.product_desc ?
                <Typography variant='subtitle1' style={{marginTop: theme.spacing(1)}}>
                    {product.product_desc}
                </Typography> :
                null
            }
            {
                product.has_colors ?
                <ProductSearchColor
                    product_id={product.product_id}
                    store_group_id={store_group_id}
                    color={color}
                    handleColorSelect={setColor}
                /> : 
                null
            }
            {
                product.size_grid_id ?
                <ProductSearchSize
                    size_grid_id={product.size_grid_id}
                    size={size}
                    handleSizeSelect={setSize}
                /> : 
                null
            }
            {
                product.product_id ?
                <QuantityInput
                    value={quantity}
                    handleChange={setQuantity}
                /> :
                null
            }

            <Box display='flex' justifyContent='flex-end' marginTop={1}>
                <Button 
                    variant='contained' 
                    onClick={handleClearClick}
                >
                    <FormattedMessage id='Clear'/>
                </Button>
                <Button
                    variant='contained' 
                    color='primary' 
                    disabled={!addEnabled}
                    onClick={handleAddClick}
                    style={{marginLeft: theme.spacing(1)}}
                >
                    <FormattedMessage id='Add'/>
                </Button>
            </Box>
        </Box>
    )
}
 
export default ProductSearch;