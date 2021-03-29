
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Users = ({store_group_code, ...params}) => {
    return api.get(`/v2/${store_group_code}/users`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_User = ({store_group_code, user_id}) => {
    return api.get(`/v2/${store_group_code}/users/${user_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_User = ({store_group_code, ...params}) => {
    return api.post(`/v2/${store_group_code}/users`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_User = ({store_group_code, user_id, ...params}) => {
    return api.put(`/v2/${store_group_code}/users/${user_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_User_Stores = ({store_group_code, user_id, ...params}) => {
    return api.get(`/v2/${store_group_code}/users/${user_id}/stores`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_User_Store = ({store_group_code, user_id, params}) => {
    return api.post(`/v2/${store_group_code}/users/${user_id}/stores`, params)
    .then(handleResponse)
    .catch(handleError);
}


// Not reviwed
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