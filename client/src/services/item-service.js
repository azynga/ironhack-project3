import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5005/api',
});

const getItems = (searchParams) => {
    return service.get('/items?' + searchParams);
};

export { getItems };
