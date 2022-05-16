import React from 'react';

import ChatPreviewText from './ChatPreviewText';

const ChatPreview = ({ chat }) => {
    return (
        <div className='chat-preview'>
            <h3>Chat with {chat.otherUser.username}</h3>
            {chat.messages[1] ? (
                <ChatPreviewText message={chat.messages[1]} />
            ) : (
                ''
            )}
            {chat.messages[0] ? (
                <ChatPreviewText message={chat.messages[0]} />
            ) : (
                ''
            )}
        </div>
    );
};

export default ChatPreview;
