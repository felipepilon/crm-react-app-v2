
const apiUrl = `${process.env.REACT_APP_API_URL}/franchise`; 

export const franchises = (filters) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(filters),
    };

    return fetch(`${apiUrl}/franchises`, requestOptions)
        .then(handleResponse)
}

export const franchise = (franchiseId) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    };

    return fetch(`${apiUrl}/franchise?franchiseId=${franchiseId}`, requestOptions)
        .then(handleResponse)
}

export const update = (franchise) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(franchise),
    };

    return fetch(`${apiUrl}/update`, requestOptions)
        .then(handleResponse)
}

const handleResponse = ( response ) => {
    return response.text()
    .then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            return Promise.reject(data)
        }

        return data;
    });
}