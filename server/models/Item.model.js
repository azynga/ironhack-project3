const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: [
                'Fashion',
                'Electronics',
                'Media',
                'Interior',
                'Sports',
                'Other',
            ],
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        public: {
            type: Boolean,
            required: true,
        },
        publishedAt: {
            type: Date,
            default: null,
        },
        tags: {
            type: String,
            maxlength: 150,
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        sold: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

itemSchema.index({ title: 'text', tags: 'text' });

const Item = model('Item', itemSchema);

module.exports = Item;
