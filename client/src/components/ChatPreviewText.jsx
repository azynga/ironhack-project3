import React, { useContext } from 'react';
import TimeStamp from './TimeStamp';

import { UserContext } from '../App';

const ChatPreviewText = ({ message }) => {
    const { loggedInUser } = useContext(UserContext);
    const userId = loggedInUser._id;
    const MAX_MESSAGE_LENGTH = 60;

    console.log('MESSAGE: ', message);

    return (
        <p>
            <TimeStamp timestamp={message.timestamp} />
            {' – '}
            {message?.senderId === userId
                ? 'You: '
                : message === undefined
                ? ''
                : message.senderName + ': '}
            {message?.text.length > MAX_MESSAGE_LENGTH
                ? message?.text.slice(0, MAX_MESSAGE_LENGTH) + '...'
                : message?.text}
        </p>
    );
};

export default ChatPreviewText;
