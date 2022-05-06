const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
    {
        participants: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
        },
        messages: {
            type: [Schema.Types.Mixed],
            /*  EXAMPLE
                [
                    {
                        author: userId_1,
                        text: 'blablabla',
                        timestamp: Date.now();
                    },
                    {
                        author: userId_2,
                        text: 'blabllaaaaa',
                        timestamp: Date.now();
                    }
                ]
            */
        },
    },
    {
        timestamps: true,
    }
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;
