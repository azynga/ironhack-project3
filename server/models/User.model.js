const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     trim: true,
        //     lowercase: true,
        // },
        itemsForSale: {
            type: [Schema.Types.ObjectId],
            ref: 'Item',
        },
        favoriteItems: {
            type: [Schema.Types.ObjectId],
            ref: 'Item',
        },
        contacts: {
            type: [Schema.Types.Mixed],
        },
        // friends: {
        //     type: [Schema.Types.ObjectId],
        //     ref: 'User',
        // },
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
