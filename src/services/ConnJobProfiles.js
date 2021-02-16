
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ConnJobProfiles = (params) => {
    return api.get('/connJobProfiles', {params})
    .then(handleResponse)
    .catch(handleError);
}