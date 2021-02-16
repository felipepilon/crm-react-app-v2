
const refStorageKey = 'RefreshToken';
const accessStorageKey = 'AccessToken';

const getRefreshToken = () => localStorage.getItem(refStorageKey);
const cleanRefreshToken = () => localStorage.removeItem(refStorageKey);
const setRefreshToken = (token) => localStorage.setItem(refStorageKey, token);

const getAccessToken = () => localStorage.getItem(accessStorageKey);
const cleanAccessToken = () => localStorage.removeItem(accessStorageKey);
const setAccessToken = (token) => localStorage.setItem(accessStorageKey, token);

export {
    getRefreshToken,
    cleanRefreshToken,
    setRefreshToken,
    getAccessToken,
    cleanAccessToken,
    setAccessToken,
}
