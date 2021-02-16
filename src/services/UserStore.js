
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_UserStores = (params) => {
    return api.get('/usersStores', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_UserStore = ({user_store_id}) => {
    return api.get(`/usersStores/${user_store_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_UserStore = (params) => {
    return api.post('/usersStores', params)
    .then(handleResponse)
    .catch(handleError);
}

export const delete_UserStore = (params) => {
    return api.delete('/usersStores', {params})
    .then(handleResponse)
    .catch(handleError);
}