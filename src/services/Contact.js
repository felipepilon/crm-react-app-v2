import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Contact = ({store_group_code, ...params}) => {
    return api.post(`/v2/${store_group_code}/contacts`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_Contact = ({store_group_code, contact_id, ...params}) => {
    return api.put(`/v2/${store_group_code}/contacts/${contact_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Interactions = ({store_group_code, contact_id, ...params}) => {
    return api.post(`/v2/${store_group_code}/contacts/${contact_id}/interactions`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Contacts = ({store_group_code, ...params}) => {
    return api.get(`/v2/${store_group_code}/contacts`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ContactInteractions = ({store_group_code, contact_id, ...params}) => {
    return api.get(`/v2/${store_group_code}/contacts/${contact_id}/interactions`, {params})
    .then(handleResponse)
    .catch(handleError);
}