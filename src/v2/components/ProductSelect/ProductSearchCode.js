import React from 'react';
import { Typography } from '@material-ui/core';
import Autocomplete from '../Autocomplete/Autocomplete';
import { get_Products } from '../../../services/Product';

const ProductSearchCode = ({handleSelect, store_group_code, product}) => {
    return (
        <Autocomplete valueField='product_code'
            labelOptionField={(({opt}) => {
                return (
                    <Typography variant='body1'>{`${opt.product_code} - ${opt.product_desc}`}</Typography>
                );
            })}
            getOptionsFnc={get_Products}
            getOptionsParams={{store_group_code, params: {_limit: 10}}}
            getOptionsField='search_index'
            minLength='2'
            selected={product}
            handleSelect={handleSelect}
        />
    )
}
 
export default ProductSearchCode;