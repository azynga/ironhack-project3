import axios from 'axios';

const service = axios.create({
    baseURL: '/api',
});

const saveNotification = (userId, notification) => {
    return service.put('/users/notify/' + userId, { notify: notification });
};

const getAllItemsOfUser = (userId) => {
    return service.get(`/users/${userId}/items`);
};

const updateUser = (userId, property) => {
    return service.put('/users/' + userId, property);
};

export { saveNotification, getAllItemsOfUser, updateUser };
