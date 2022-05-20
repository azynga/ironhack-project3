import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChatId } from '../services/chat-service';
import { UserContext } from '../App';

const EnterChat = ({ otherUserId, children, selected, even }) => {
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleEnterChat = () => {
        getChatId(loggedInUser._id, otherUserId)
            .then((response) => {
                console.log('getChatId response: ', response);
                const chatId = response.data;
                navigate('/messages/' + chatId, { replace: true });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div
            onClick={handleEnterChat}
            className={`enter-chat ${selected ? 'selected' : ''} ${
                even ? 'even' : ''
            }`}
            style={{
                cursor: 'pointer',
            }}
        >
            {children ? children : <button>Enter chat</button>}
        </div>
    );
};

export default EnterChat;
