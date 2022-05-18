const router = require('express').Router();
const User = require('../models/User.model');

router.get('/:userId/items', (req, res) => {
    const { userId } = req.params;
    User.findById(userId, { itemsForSale: 1, _id: 0 })
        .populate('itemsForSale')
        .then((response) => {
            const { itemsForSale } = response;
            res.json(itemsForSale);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;

    User.findByIdAndUpdate(userId, req.body, { new: true })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.put('/notify/:userId', (req, res) => {
    console.log(req.body);
    const { notify } = req.body;
    const { userId } = req.params;
    console.log('notify', notify);
    console.log('user: ', userId);
    User.findByIdAndUpdate(userId, { unreadMessages: notify }, { new: true })
        .then((user) => {
            console.log(user);
            res.json({ message: 'Notification saved' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error while updating user' });
        });
});

module.exports = router;
