
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ConnJobProfiles = ({params}) => {
    return api.get('/v2/conn/JobProfiles', {params})
    .then(handleResponse)
    .catch(handleError);
}