import React, { useEffect, useContext, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { UserContext } from '../App';
import { addMessage, getChat } from '../services/chat-service';

import Message from './Message';
import ChatList from './ChatList';

const Chat = () => {
    console.log('reached chat component');
    const navigate = useNavigate();
    const {
        currentSocket: socket,
        loggedInUser,
        setNotification,
    } = useContext(UserContext);
    const { chatId } = useParams();
    const thisUserId = loggedInUser._id;
    const [otherUser, setOtherUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [receivedMessage, setReceivedMessage] = useState(null);
    const endOfFeed = useRef();

    const scrollToBottom = () => {
        endOfFeed.current?.scrollIntoView();
    };

    useEffect(() => {
        setNotification(false);
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (receivedMessage) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    useEffect(() => {
        getChat(chatId)
            .then((response) => {
                const chat = response.data;

                if (!chat._id) {
                    throw new Error('Chat was not found');
                }

                if (
                    !chat.participants.some((user) => user._id === thisUserId)
                ) {
                    throw new Error('User is not allowed in this chat');
                }

                const otherParticipant = chat.participants.find(
                    (user) => user._id !== thisUserId
                );

                setOtherUser(otherParticipant);
                setMessages(chat.messages.reverse());
                localStorage.setItem('selectedChat', JSON.stringify(chatId));
            })
            .catch((error) => {
                console.error(error);
                navigate('/messages');
            });
    }, [chatId]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('message', (message) => {
            setReceivedMessage(message);
        });

        return () => socket.off('message');
    }, [socket]);

    const handleSendMessage = (event) => {
        event?.preventDefault();

        if (!messageText) {
            return;
        }

        const message = {
            chatId,
            recipientName: otherUser.username,
            recipientId: otherUser._id,
            senderName: loggedInUser.username,
            senderId: thisUserId,
            text: messageText,
            timestamp: Date.now(),
        };

        addMessage(chatId, message)
            .then((response) => {
                const message = response.data;
                socket.emit('message', message);
                setMessages([...messages, message]);
                setMessageText('');
            })
            .catch((error) => console.error(error));
    };

    const feed = messages?.map((message) => {
        return (
            <Message
                key={Math.random().toString(36)}
                message={message}
                own={message?.senderId === thisUserId}
            />
        );
    });

    return (
        <>
            <aside>
                <ChatList />
            </aside>
            <main className='chat col'>
                <div
                    className='feed col'
                    // style={{ width: 600, height: 600, overflow: 'scroll' }}
                >
                    {feed}
                    <div ref={endOfFeed}></div>
                </div>
                <form onSubmit={handleSendMessage}>
                    <label htmlFor='message' className='visually-hidden'>
                        Message
                    </label>
                    <textarea
                        type='text'
                        id='message'
                        onChange={(event) => setMessageText(event.target.value)}
                        value={messageText}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                handleSendMessage();
                            }
                        }}
                        placeholder='Type here...'
                        maxLength={1000}
                    />
                    <button>
                        <i
                            title='Send'
                            className='bi bi-send'
                            role='img'
                            aria-label='Send'
                        ></i>
                    </button>
                </form>
            </main>
        </>
    );
};

export default Chat;
