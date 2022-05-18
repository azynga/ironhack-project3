import React from 'react';
import { Navigate } from 'react-router-dom';

const NavigateToSelectedChat = () => {
    console.log(localStorage.getItem('selectedChat'));
    const selectedChat = JSON.parse(localStorage.getItem('selectedChat'));
    return selectedChat ? <Navigate to={selectedChat} /> : <></>;
};

export default NavigateToSelectedChat;
