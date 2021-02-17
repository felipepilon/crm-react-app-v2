
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Customer = (params) => {
    return api.post('/customers', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customers = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/customers`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_CustomersIndex = (params) => {
    return api.get('/customers/index', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customer = ({store_group_code, customer_code}) => {
    return api.get(`/v2/${store_group_code}/customers/${customer_code}`)
    .then(handleResponse)
    .catch(handleError);
}