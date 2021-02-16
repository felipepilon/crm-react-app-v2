import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_ReserveProduct = (params) => {
    return api.post('/reserveProducts', params)
    .then(handleResponse)
    .catch(handleError);
}