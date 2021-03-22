import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Reserve = ({store_group_code, params}) => {
    return api.post(`/v2/${store_group_code}/reserves`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ReserveDetails = (params) => {
    return api.get('/reserves/details', {params})
    .then(handleResponse)
    .catch(handleError);
}