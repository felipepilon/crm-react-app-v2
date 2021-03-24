import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Contact = ({store_group_code, params}) => {
    return api.post(`/v2/${store_group_code}/contacts`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const put_Contact = ({store_group_code, contact_id, params}) => {
    return api.put(`/v2/${store_group_code}/contacts/${contact_id}`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Interactions = ({store_group_code, contact_id, params}) => {
    return api.post(`/v2/${store_group_code}/contacts/${contact_id}/interactions`, params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Contacts = ({store_group_code, params}) => {
    return api.get(`/v2/${store_group_code}/contacts`, {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Interactions = (params) => {
    return api.get('/contacts/interactions', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_SumToDoBirthday = (params) => {
    return api.get('/contacts/toDoSum/birthday', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ToDoBirthday = (params) => {
    return api.get('/contacts/toDo/birthday', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_SumToDoReserve = (params) => {
    return api.get('/contacts/toDoSum/reserve', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ToDoReserve = (params) => {
    return api.get('/contacts/toDo/reserve', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_SumToDoSale = (params) => {
    return api.get('/contacts/toDoSum/sale', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ToDoSale = (params) => {
    return api.get('/contacts/toDo/sale', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_SumToDoDaysNoBuying = (params) => {
    return api.get('/contacts/toDoSum/daysNoBuying', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ToDoDaysNoBuying = (params) => {
    return api.get('/contacts/toDo/daysNoBuying', {params})
    .then(handleResponse)
    .catch(handleError);
}