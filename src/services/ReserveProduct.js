import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ReserveProducts = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/reserveProducts`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const put_ReserveProduct = ({store_group_code, reserve_product_id, params}) => {
    return api.put(`/v2/${store_group_code}/reserveProducts/${reserve_product_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}