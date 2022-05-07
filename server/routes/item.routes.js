const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Item = require('../models/Item.model');
const User = require('../models/User.model');

router.get('/', (req, res) => {
    const pipeline = (query) => {
        const { search, category, location, skip, sort, limit } = query;
        const sold = !!query.sold;
        const match = {
            ...(category && { category }),
            ...(location && { location }),
            sold,
        };

        console.log(query);

        const sortOptions = {
            relevance: { score: -1 },
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            date_asc: { updatedAt: 1 },
            date_desc: { updatedAt: -1 },
        };

        if (search) {
            return [
                { $match: { $text: { $search: search } } },
                { $match: match },
                { $addFields: { score: { $meta: 'textScore' } } },
                {
                    $sort: sort ? sortOptions[sort] : sortOptions.relevance,
                },
                { $skip: parseInt(skip ? skip : 0) },
                { $limit: parseInt(limit ? limit : 20) },
            ];
        } else {
            return [
                { $match: match },
                {
                    $sort: sort ? sortOptions[sort] : sortOptions.date_desc,
                },
                { $skip: parseInt(skip ? skip : 0) },
                { $limit: parseInt(limit ? limit : 20) },
            ];
        }
    };

    Item.aggregate(pipeline(req.query))
        .then((match) => {
            console.log(match);
            res.json(match);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Item.findById(id)
        .populate('owner')
        .then((item) => {
            res.json(item);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.post(
    '/',
    /*isLoggedIn,*/ (req, res) => {
        Item.create(req.body)
            .then((item) => {
                return User.findByIdAndUpdate(
                    item.owner,
                    {
                        $push: { itemsForSale: item._id },
                    },
                    { new: true }
                ).populate('itemsForSale');
            })
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((error) => {
                res.json(error);
            });
    }
);

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Item.findByIdAndUpdate(id, req.body, { new: true })
        .populate('owner')
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((error) => {
            res.json(updatedItem);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Item.findByIdAndDelete(id)
        .then((deletedItem) => {
            return User.findByIdAndUpdate(
                deletedItem.owner,
                {
                    $pull: { itemsForSale: deletedItem._id },
                },
                { new: true }
            );
        })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((error) => {
            res.json(error);
        });
});

module.exports = router;
