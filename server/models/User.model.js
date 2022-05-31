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
        location: {
            address: {
                type: Schema.Types.Mixed,
            },
            geometry: {
                type: {
                    type: String,
                    enum: ['Point'],
                },
                coordinates: {
                    type: [Number],
                },
            },
        },
        itemsForSale: {
            type: [Schema.Types.ObjectId],
            ref: 'Item',
        },
        favoriteItems: {
            type: [Schema.Types.ObjectId],
            ref: 'Item',
        },
        storageData: {
            type: Schema.Types.Mixed,
            default: null,
        },
        unreadMessages: {
            type: Boolean,
            default: false,
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
