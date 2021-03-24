import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ReserveProducts = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/reserveProducts`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_ReserveProduct = (params) => {
    return api.post('/reserveProducts', params)
    .then(handleResponse)
    .catch(handleError);
}