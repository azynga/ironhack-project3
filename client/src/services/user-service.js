import axios from 'axios';

const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const saveNotification = (userId, notification) => {
    return service.put('/users/notify/' + userId, { notify: notification });
};

const getAllItemsOfUser = (userId) => {
    return service.get(`/users/${userId}/items`);
};

const getAllFavsOfUser = (userId) => {
    return service.get(`/users/${userId}/favorites`);
};

const updateUser = (userId, property) => {
    return service.put('/users/' + userId, property);
};

export { saveNotification, getAllItemsOfUser, updateUser, getAllFavsOfUser };
