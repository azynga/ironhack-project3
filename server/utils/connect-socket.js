const socket = require('socket.io');
const User = require('../models/User.model');
const Chat = require('../models/Chat.model');

const connectSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:3000', // process.env.ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('connected: ', socket.id);

        socket.on('join', (userId) => {
            console.log('user joined room ', userId);
            socket.join(userId);
        });

        socket.on('message', (message) => {
            const { recipientId, senderId, chatId } = message;
            // delete message.chatId;
            socket.to(recipientId).emit('message', message);
            io.in(recipientId).in(senderId).emit('notify');
            // Chat.findByIdAndUpdate(chatId, {
            //     $push: {
            //         messages: {
            //             $each: [message],
            //             $position: 0,
            //         },
            //     },
            // })
            //     .then((res) => {
            //         console.log(res);
            //         return User.findByIdAndUpdate(message.recipientId, {
            //             unreadMessages: true,
            //         });
            //     })
            //     .then((res) => {
            //         console.log(res);
            //         console.log('Message and notification saved');
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
        });

        socket.on('disconnect', (reason) => {
            console.log('disconnected: ', reason);
        });
    });
};

module.exports = connectSocket;
