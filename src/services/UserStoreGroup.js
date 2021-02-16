
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_UserStoreGroups = (params) => {
    return api.get('/usersStoreGroups', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_UserStoreGroup = ({user_store_group_id}) => {
    return api.get(`/usersStoreGroups/${user_store_group_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_UserStoreGroup = (params) => {
    return api.post('/usersStoreGroups', params)
    .then(handleResponse)
    .catch(handleError);
}

export const delete_UserStoreGroup = (params) => {
    return api.delete('/usersStoreGroups', {params})
    .then(handleResponse)
    .catch(handleError);
}