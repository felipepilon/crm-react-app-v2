
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Connectors = ({store_group_code, ...params}) => {
    return api.get(`/v2/${store_group_code}/connectors`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Connector = ({store_group_code, user_id}) => {
    return api.get(`/v2/${store_group_code}/connectors/${user_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Connector = ({store_group_code, ...params}) => {
    return api.post(`/v2/${store_group_code}/connectors`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_Connector = ({store_group_code, user_id, ...params}) => {
    return api.put(`/v2/${store_group_code}/connectors/${user_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}