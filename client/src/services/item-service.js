import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5005/api',
});

const getItems = (searchParams) => {
    console.log('service params:', searchParams);
    return service.get('/items?' + searchParams);
};

export { getItems };
