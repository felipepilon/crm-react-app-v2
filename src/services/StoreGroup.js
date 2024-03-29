
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_StoreGroups = ({...params}) => {
    return api.get('/v2/storeGroups', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_StoreGroup = ({store_group_code}) => {
    return api.get(`/v2/storeGroups/${store_group_code}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_StoreGroup = ({...params}) => {
    return api.post('/v2/storeGroups', params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_StoreGroup = ({store_group_code, ...params}) => {
    return api.put(`/v2/storeGroups/${store_group_code}`, params)
    .then(handleResponse)
    .catch(handleError);
}