
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ConnUsers = ({store_group_code, ...params}) => {
    return api.get(`/v2/${store_group_code}/connUsers`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ConnUser = ({store_group_code, user_id}) => {
    return api.get(`/v2/${store_group_code}/connUsers/${user_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ConnUser = ({store_group_code, ...params}) => {
    return api.post(`/v2/${store_group_code}/connUsers`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_ConnUser = ({store_group_code, user_id, ...params}) => {
    return api.put(`/v2/${store_group_code}/connUsers/${user_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ConnUserRefreshToken = ({store_group_code, user_id, ...params}) => {
    return api.get(`/v2/${store_group_code}/connUsers/${user_id}/refreshToken`, params)
    .then(handleResponse)
    .catch(handleError);
}