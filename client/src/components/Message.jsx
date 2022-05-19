import React from 'react';

import TimeStamp from './TimeStamp';

const Message = ({ message, own }) => {
    const { senderName, text, timestamp } = message;

    return (
        <div className={`col message ${own ? 'own' : ''}`}>
            <span className='sender-name'>{own ? 'You: ' : senderName}</span>
            <p>{text}</p>
            <TimeStamp timestamp={timestamp} />
        </div>
    );
};

export default Message;
