const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Chat = require('../models/Chat.model');

const DEFAULT_MESSAGE_LIMIT = 50;

router.get('/:id', (req, res) => {
    const { limit = DEFAULT_MESSAGE_LIMIT, skip = 0 } = req.query;
    const { id } = req.params;
    Chat.findById(id)
        .then((chat) => {
            const messages = chat.messages.slice(skip, skip + limit);
            res.json(messages);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.post('/', (req, res) => {
    Chat.create(req.body)
        .then((chat) => {
            res.json(chat);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.put('/:id', (req, res) => {
    const { limit = DEFAULT_MESSAGE_LIMIT, skip = 0 } = req.query;
    const { id } = req.params;
    const { message } = req.body;
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
            const messages = chat.messages.slice(skip, skip + limit);
            res.json(messages);
        })
        .catch((error) => {
            res.json(error);
        });
});

module.exports = router;
