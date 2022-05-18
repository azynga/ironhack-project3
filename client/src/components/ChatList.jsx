import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAllChatsOfUser } from '../services/chat-service';
import { UserContext } from '../App';
import ChatPreview from './ChatPreview';
import EnterChat from './EnterChat';

const ChatList = () => {
    const { chatId: selectedChat } = useParams();
    const {
        setNotification,
        loggedInUser,
        currentSocket: socket,
    } = useContext(UserContext);
    const [chats, setChats] = useState(null);
    const [loadingNewMessages, setLoadingNewMessages] = useState(false);
    const userId = loggedInUser._id;

    useEffect(() => {
        setNotification(false);
    });

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on('notify', () => {
            setLoadingNewMessages(true);
        });
    }, [socket]);

    useEffect(() => {
        getAllChatsOfUser(userId)
            .then((response) => {
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
            })
            .finally(() => {
                setLoadingNewMessages(false);
            });
    }, [userId, loadingNewMessages]);

    const chatList = chats?.map((chat, index) => {
        return (
            <EnterChat
                even={index % 2 === 0}
                selected={selectedChat === chat._id}
                key={chat._id}
                otherUserId={chat.otherUser._id}
            >
                <ChatPreview chat={chat} />
            </EnterChat>
        );
    });

    return <div className='chat-list'>{chatList}</div>;
};

export default ChatList;
