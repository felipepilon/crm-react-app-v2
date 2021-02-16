import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Products = ({store_group_id, params}) => {
    return api.get(`/v2/${store_group_id}/products`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ProductSizeGrid = ({store_group_id, product_id, params}) => {
    return api.get(`/v2/${store_group_id}/products/${product_id}/sizeGrid`, {params})
    .then(handleResponse)
    .catch(handleError);
}
export const get_ProductColors = ({store_group_id, product_id, params}) => {
    return api.get(`/v2/${store_group_id}/products/${product_id}/colors`, {params})
    .then(handleResponse)
    .catch(handleError);
}
