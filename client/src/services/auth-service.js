import axios from 'axios';

const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL, //'http://localhost:5005/api',
    withCredentials: true,
});

const signup = (username, password) => {
    return service.post('/auth/signup', { username, password });
};

const login = (username, password) => {
    return service.post('/auth/login', { username, password });
};

const loggedin = () => {
    return service.get('/auth/loggedin');
};

const logout = () => {
    return service.get('/auth/logout');
};

export { signup, login, loggedin, logout };
