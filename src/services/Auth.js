import { 
    cleanRefreshToken, 
    setRefreshToken,
    setAccessToken,
    cleanAccessToken,
    getRefreshToken
} from '../utils/TokenStorage';
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_UserByEmail = ({email}) => {
    return api.get(`/v2/auth/user/byEmail/${email}`)
    .then(handleResponse)
    .catch(handleError);
}

export const get_AuthUser = () => {
    return api.get('v2/auth/authUser')
    .then(handleResponse)
    .catch(handleError);
}

export const post_SignIn = ({email, password}) => {
    return api.post('v2/auth/signIn', {email, password})
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