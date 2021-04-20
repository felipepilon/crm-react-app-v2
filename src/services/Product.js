import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Products = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/products`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ProductSizeGrid = ({store_group_code, product_code, params}) => {
    return api.get(`/v2/${store_group_code}/products/${product_code}/sizeGrid`, {params})
    .then(handleResponse)
    .catch(handleError);
}
export const get_ProductColors = ({store_group_code, product_code, params}) => {
    return api.get(`/v2/${store_group_code}/products/${product_code}/colors`, {params})
    .then(handleResponse)
    .catch(handleError);
}
