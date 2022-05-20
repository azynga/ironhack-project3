import React from 'react';
import { Navigate } from 'react-router-dom';

const NavigateToSelectedChat = () => {
    const selectedChat = JSON.parse(localStorage.getItem('selectedChat'));
    console.log('selected chat: ', selectedChat);
    return selectedChat ? <Navigate to={selectedChat} replace={true} /> : <></>;
};

export default NavigateToSelectedChat;
