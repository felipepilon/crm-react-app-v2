
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_SalesSummary = (params) => {
    return api.post('/sale/summary', params)
    .then(handleResponse)
    .catch(handleError);
}