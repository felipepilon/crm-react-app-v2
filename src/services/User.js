
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Users = (params) => {
    return api.get('/users', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_User = ({user_id}) => {
    return api.get(`/users/${user_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_User = (params) => {
    return api.post('/users', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ConnUser = ({user_id}) => {
    return api.get(`/users/${user_id}/connUser`)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ConnRefreshToken = ({user_id}) => {
    return api.get(`/users/${user_id}/connRefreshToken`)
    .then(handleResponse)
    .catch(handleError);
}