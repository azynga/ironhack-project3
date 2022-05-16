import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5005/api',
});

const saveNotification = (userId, notification) => {
    console.log(notification);
    return service.put('/users/notify/' + userId, { notify: notification });
};

const getAllItemsOfUser = (userId) => {
    return service.get(`/users/${userId}/items`);
};

export { saveNotification, getAllItemsOfUser };
