import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Salespeople = (filters) => {
    return api.post('/salesman/salespeople', filters)
    .then(handleResponse)
    .catch(handleError);
}