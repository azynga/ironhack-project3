const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Chat = require('../models/Chat.model');
const User = require('../models/User.model');

const DEFAULT_MESSAGE_LIMIT = 50;

router.get('/', (req, res) => {
    const { user, otheruser } = req.query;

    if (!user || !otheruser) {
        throw new Error('Users in chat not properly specified');
    }

    if (user === otheruser) {
        throw new Error('User and otheruser must be different IDs');
    }

    Chat.findOne({
        $and: [{ participants: user }, { participants: otheruser }],
    })
        .then((chat) => {
            if (chat?._id) {
                res.json(chat._id);
            } else {
                Chat.create({ participants: [user, otheruser] }).then(
                    (chat) => {
                        res.json(chat._id);
                    }
                );
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/list', (req, res) => {
    const { user } = req.query;
    Chat.find({
        $and: [{ participants: user }, { 'messages.0': { $exists: true } }],
    })
        .sort({ updatedAt: -1 })
        .populate('participants')
        .then((chats) => {
            res.json(chats);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    const { limit = DEFAULT_MESSAGE_LIMIT, skip = 0 } = req.query;
    const { id } = req.params;
    Chat.findById(id)
        .populate('participants')
        .then((chat) => {
            chat.messages = chat.messages.slice(skip, skip + limit);
            res.json(chat);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const message = req.body;
    /*  MESSAGE EXAMPLE
        {
            author: userId_1,
            text: 'blablabla',
            timestamp: Date.now();
        }
    */
    Chat.findByIdAndUpdate(
        id,
        {
            $push: {
                messages: {
                    $each: [message],
                    $position: 0,
                },
            },
        },
        { new: true }
    )
        .then((chat) => {
            const message = chat.messages[0];
            res.json(message);
            // const messages = chat.messages.slice(skip, skip + limit);
            // res.json(messages);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

module.exports = router;
