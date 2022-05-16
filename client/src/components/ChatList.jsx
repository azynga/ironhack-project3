import React, { useState, useContext, useEffect } from 'react';

import { getAllChatsOfUser } from '../services/chat-service';
import { UserContext } from '../App';
import ChatPreview from './ChatPreview';
import EnterChat from './EnterChat';

const ChatList = () => {
    const { setNotification, loggedInUser } = useContext(UserContext);
    const [chats, setChats] = useState(null);
    const userId = loggedInUser._id;

    useEffect(() => {
        setNotification(false);
    });

    useEffect(() => {
        getAllChatsOfUser(userId)
            .then((response) => {
                console.log('response ', response);
                const chats = response.data.map((chat) => {
                    const otherUser = chat.participants.find(
                        (user) => user._id !== userId
                    );
                    chat.otherUser = { ...otherUser };
                    return chat;
                });
                setChats(chats);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const chatList = chats?.map((chat) => {
        return (
            <EnterChat key={chat._id} otherUserId={chat.otherUser._id}>
                <ChatPreview chat={chat} />
            </EnterChat>
        );
    });

    return <div className='chat-list'>{chatList}</div>;
};

export default ChatList;
