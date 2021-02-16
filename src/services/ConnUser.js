
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_ConnUser = (params) => {
    return api.post('/connUsers', params)
    .then(handleResponse)
    .catch(handleError);
}