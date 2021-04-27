
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ContactMsgPresets = ({store_group_code, ...params}) => {
    return api.get(`/v2/${store_group_code}/contactMsgPresets`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ContactMsgPreset = ({store_group_code, contact_msg_preset_id}) => {
    return api.get(`/v2/${store_group_code}/contactMsgPresets/${contact_msg_preset_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ContactMsgPreset = (params) => {
    return api.post('/contactMsgPresets', params)
    .then(handleResponse)
    .catch(handleError);
}