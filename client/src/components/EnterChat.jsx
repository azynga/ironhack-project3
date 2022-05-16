import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChatId } from '../services/chat-service';
import { UserContext } from '../App';

const EnterChat = ({ otherUserId, children }) => {
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleEnterChat = () => {
        getChatId(loggedInUser._id, otherUserId)
            .then((response) => {
                const chatId = response.data;
                navigate('/messages/' + chatId);
            })
            .catch((error) => {
                console.log(error);
            });

        // const { contacts, _id: userId } = loggedInUser;
        // const existingContact = contacts.find(
        //     (contact) => contact.otherUserId === otherUserId
        // );
        // console.log(existingContact);
        // if (existingContact) {
        //     console.log('contact exists');
        //     navigate('/messages/' + existingContact.chatId);
        // } else {
        //     console.log('contact does not exist');

        //     createChat([userId, otherUserId])
        //         .then((response) => {
        //             console.log('create response: ', response);
        //             const chatId = response.data;
        //             navigate('/messages/' + chatId);
        //         })
        //         .catch((error) => console.log(error));
        // }
    };

    return (
        <div onClick={handleEnterChat} style={{ cursor: 'pointer' }}>
            {children ? children : <button>Enter chat</button>}
        </div>
    );
};

export default EnterChat;
