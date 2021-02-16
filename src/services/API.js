import axios from 'axios';
import { 
    getRefreshToken, 
    cleanRefreshToken, 
    getAccessToken,
    setAccessToken,
    cleanAccessToken,
} from '../utils/TokenStorage';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptors
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    
    return config;
}, (err) => {
    console.log('api.interceptors.request.use err', err);
    return Promise.reject(err);
});

// Response interceptors
api.interceptors.response.use((config) => {
    // Do somthing with successful response 

    return config;
}, (err) => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        const refresh_token = getRefreshToken();

        const retry = (
            err.response.status === 401 && 
            originalReq && 
            !originalReq._isRetryReq &&
            refresh_token
        ) ? true : false;
        
        if (retry)
        {
            console.log('Request refused. Requesting a new access token')

            originalReq._isRetryReq = true;

            const res = api.post('/auth/token', {
                refresh_token
            })
            .then((res) => {
                console.log('Access token updated.')

                setAccessToken(res.data.access_token);
                
                return api.request(originalReq);
            })
            .catch((err2) => {
                console.log('auth/token err2', err2)
                cleanRefreshToken();
                cleanAccessToken();
                return Promise.reject(err2);
            });

            resolve(res);
        }

        reject(err.response.data || { 
            status: err.response.status,
            message: err.response.statusText,
        });
    })
});

console.log('Axios init')

export default api;