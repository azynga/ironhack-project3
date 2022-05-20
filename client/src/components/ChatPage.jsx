import React from 'react';

import NavigateToSelectedChat from './NavigateToSelectedChat';
import ChatList from './ChatList';

const ChatPage = () => {
    return (
        <>
            <aside>
                <ChatList />
            </aside>
            <main className='chat col'>
                <NavigateToSelectedChat />
            </main>
        </>
    );
};

export default ChatPage;
