import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Typography, useTheme } from '@material-ui/core';
import ProductSearchCode from './ProductSearchCode';
import ProductSearchSize from './ProductSearchSize';
import { FormattedMessage } from 'react-intl';
import ProductSearchColor from './ProductSearchColor';
import QuantityInput from './QuantityInput';
import { WorkspaceContext } from '../../contexts/Workspace';

const ProductSelect = ({products, handleAddProduct}) => {
    const { store_group_code } = useContext(WorkspaceContext);

    const [ product, setProduct ] = useState({});
    const [ size, setSize ] = useState('');
    const [ color, setColor ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ errorMsg, setErrorMsg ] = useState('');

    const theme = useTheme();

    const handleAddClick = (e) => {
        e.preventDefault();

        if (products.find((p) => 
            p.product.product_code === product.product_code && 
            (!p.product.size_grid_id || p.size === size)
        )) {
            setErrorMsg('Already added');
            return;
        }

        handleAddProduct({product, size, color, quantity})
        setProduct({});
    }

    const handleClearClick = (e) => {
        e.preventDefault();
        setProduct({});
    }

    useEffect(() => {
        setSize('');
        setColor({});
        setErrorMsg('');
        setQuantity(1);
    }, [product])
    
    const addEnabled = product && product.product_code &&
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
                store_group_code={store_group_code} 
                product={product}
                handleSelect={setProduct}
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
                    store_group_code={store_group_code}
                    product_code={product.product_code}
                    color={color}
                    handleColorSelect={setColor}
                /> : 
                null
            }
            {
                product.size_grid_id ?
                <ProductSearchSize
                    store_group_code={store_group_code}
                    product_code={product.product_code}
                    size={size}
                    handleSizeSelect={setSize}
                /> : 
                null
            }
            {
                product.product_code ?
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
 
export default ProductSelect;