
export const handleResponse = (res) => {
    return res.data;
}

export const handleError = (err) => {
    console.error('handleError')
    console.error(err);
    return Promise.reject(err);
}