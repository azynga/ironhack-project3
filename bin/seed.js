const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');
const MONGO_URI = require('../utils/consts');

const categories = [
    'Fashion',
    'Electronics',
    'Media',
    'Interior',
    'Sports',
    'Other',
];

const tagExamples = [
    'summer',
    'colorful',
    'color',
    'pink',
    'stretchy',
    'loose',
    'oversized',
    'loose fit',
    'tight fit',
    'crazy',
    'natural',
    'green',
    'flashy',
    'elegant',
    'warm',
    'fancy',
    'cozy',
];

const genericImageUrl = 'https://picsum.photos/400';

const genericUser = () => {
    return {
        username: 'user_' + Math.random().toString(36).slice(2),
        password: '1234',
    };
};

const genericItem = (users) => {
    const owner = users[Math.floor(Math.random() * users.length)]._id;
    const numberOfTags = 2 + Math.floor(Math.random() * 5);
    const tags = new Array(numberOfTags)
        .fill()
        .map(
            (tag) => tagExamples[Math.floor(Math.random() * tagExamples.length)]
        )
        .join(', ');

    const numberOfImages = 1 + Math.floor(Math.random() * 6);
    const images = new Array(numberOfImages)
        .fill()
        .map((image) => genericImageUrl);

    return {
        title: 'Article No. ' + Math.floor(Math.random() * 10000).toString(),
        price: Math.floor(Math.random() * 100),
        owner,
        category: categories[Math.floor(Math.random() * categories.length)],
        sold: Math.random() > 0.7 ? true : false,
        tags,
        images,
        public: true,
        location: 'somewhere',
    };
};

mongoose
    .connect(MONGO_URI)
    .then(() => {
        return User.create(new Array(10).fill().map((user) => genericUser()));
    })
    .then((users) => {
        console.log(users);
        return Item.create(
            new Array(30).fill().map((item) => genericItem(users))
        );
    })
    .then((items) => {
        console.log(items);
        return Promise.all(
            items.map((item) => {
                return User.findByIdAndUpdate(
                    item.owner,
                    {
                        $push: { itemsForSale: item._id },
                    },
                    {
                        new: true,
                    }
                );
            })
        );
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
