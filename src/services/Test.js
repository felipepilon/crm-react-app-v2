
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Test = (params) => {
    return api.get('/test', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_Test = (params) => {
    return api.post('/test', params)
    .then(handleResponse)
    .catch(handleError);
}
