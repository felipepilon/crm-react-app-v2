import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Reserve = (params) => {
    return api.post('/reserves', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ReserveDetails = (params) => {
    return api.get('/reserves/details', {params})
    .then(handleResponse)
    .catch(handleError);
}