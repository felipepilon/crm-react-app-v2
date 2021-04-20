import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_AgendaSummary = ({store_group_code, date}) => {
    return api.get(`/v2/${store_group_code}/agenda/${date}/summary`)
    .then(handleResponse)
    .catch(handleError);
}

export const get_AgendaBirthdays = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/agenda/birthdays`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_AgendaReserves = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/agenda/reserves`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_AgendaSales = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/agenda/sales`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_AgendaMissing = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/agenda/missing`, {params})
    .then(handleResponse)
    .catch(handleError);
}
