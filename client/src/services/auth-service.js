import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5005/api/auth',
    withCredentials: true,
});

const signup = (username, password) => {
    return service.post('/signup', { username, password });
};

const login = (username, password) => {
    return service.post('/login', { username, password });
};

const loggedin = () => {
    return service.get('/loggedin');
};

const logout = () => {
    return service.get('/logout');
};

export { signup, login, loggedin, logout };
