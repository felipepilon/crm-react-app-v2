import { 
    cleanRefreshToken, 
    setRefreshToken,
    setAccessToken,
    cleanAccessToken,
    getRefreshToken
} from '../utils/TokenStorage';
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_User = (user) => {
    return api.get('/auth/user', {
        params: {
            email: user.email,
        }
    })
    .then(handleResponse)
    .catch(handleError);
}

export const get_AuthUser = () => {
    return api.get('/auth/authUser')
    .then(handleResponse)
    .catch(handleError);
}

export const post_SignIn = ({data}) => {
    return api.post('/auth/signIn', data)
    .then((res) => {
        if (res.data && res.data.refresh_token)
            setRefreshToken(res.data.refresh_token);

        if (res.data && res.data.access_token)
            setAccessToken(res.data.access_token);

        return res.data;
    })
    .catch(handleError);
}

export const post_SignOut = () => {
    const refresh_token = getRefreshToken();
    cleanRefreshToken();
    cleanAccessToken();

    return api.delete('/auth/signOut', {
        data: {refresh_token}
    })
    .then(handleResponse)
    .catch(handleError);
}