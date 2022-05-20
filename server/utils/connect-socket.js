const socket = require('socket.io');
const User = require('../models/User.model');
const Chat = require('../models/Chat.model');

const connectSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: process.env.ORIGIN, // 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('connected: ', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log('User joined room ', userId);
        });

        socket.on('leave', (userId) => {
            socket.leave(userId);
            console.log('User left the room ', userId);
        });

        socket.on('message', (message) => {
            const { recipientId, senderId, chatId } = message;

            socket.to(recipientId).emit('message', message);
            io.in(recipientId).in(senderId).emit('notify');
        });

        socket.on('disconnect', (reason) => {
            console.log('disconnected: ', reason);
        });
    });
};

module.exports = connectSocket;
