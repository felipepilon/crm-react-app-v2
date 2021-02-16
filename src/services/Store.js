
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Stores = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/stores`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Store = ({store_group_code, store_code}) => {
    return api.get(`/v2/${store_group_code}/stores/${store_code}`)
    .then(handleResponse)
    .catch(handleError);
}

export const get_StoreSalespeople = ({store_group_code, store_code, params}) => {
    return api.get(`/v2/${store_group_code}/stores/${store_code}/salespeople`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_Store = (params) => {
    return api.post('/stores', params)
    .then(handleResponse)
    .catch(handleError);
}