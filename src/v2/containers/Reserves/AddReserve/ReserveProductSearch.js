import React from 'react';
import { Paper, Box, Typography, Button, IconButton, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import DeleteIcon from '@material-ui/icons/Delete';
import ProductSelect from '../../../components/ProductSelect/ProductSelect';

const ReserveProductSearch = ({handleNextStep, handleRemoveProduct, products, handleAddProduct}) => {
    const theme = useTheme();

    const _handleNextStep = (e) => {
        e.preventDefault();
        handleNextStep();
    }

    const _handleRemoveProduct = (e, index) => {
        e.preventDefault();
        handleRemoveProduct(index);
    }

    return (
        <Box display='flex' flexDirection='column'>

            <Box display='flex' justifyContent='center'>
                <Typography variant='h6'>
                    <FormattedMessage id='Select Products'/>
                </Typography>
            </Box>

            <ProductSelect products={products} handleAddProduct={handleAddProduct}/>
            {
                products.length ?
                products.map((prod, i) => {
                    return (
                        <Paper key={i}
                            style={{
                                marginTop: theme.spacing(2),
                                display: 'flex', 
                                alignItems: 'center',
                            }}
                        >
                            <Box flex='1' padding={1} >
                                <Typography variant='body1'>
                                    {`${prod.product.product_code} - ${prod.product.product_desc}`}
                                    {prod.product.has_colors ? ` - ${prod.color.product_color_desc}` : ''}
                                    {prod.product.size_grid_id ? ` - ${prod.size}` : ''}
                                    {` - ${prod.quantity}`}
                                </Typography>
                            </Box>
                            <IconButton onClick={(e) => _handleRemoveProduct(e, i)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Paper>
                    )
                }) : null
            }
            {
                products.length ?
                <Box display='flex' justifyContent='flex-end' marginTop={2}>
                    <Button variant='contained' color='primary'
                        disabled={products.length ? false : true}
                        onClick={_handleNextStep}
                    >
                        <FormattedMessage id='Continue' />
                    </Button>
                </Box> :
                null
            }
        </Box>
    );
};
 
export default ReserveProductSearch;