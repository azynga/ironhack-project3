import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import './App.scss';
import { getItems } from './services/item-service';
import { loggedin } from './services/auth-service';
import { saveNotification } from './services/user-service';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Browse from './components/Browse';
import ItemDetails from './components/ItemDetails';
import Create from './components/Create';
import NoMatch from './components/NoMatch';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import Profile from './components/Profile';

export const SearchContext = createContext();
export const UserContext = createContext();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [notification, setNotification] = useState(false);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSocket, setCurrentSocket] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({
        sort: 'date_desc',
        limit: 10,
    });

    // useEffect(() => {
    //     console.log(currentSocket);
    // });

    useEffect(() => {
        console.log(loggedInUser);
        if (loggedInUser) {
            saveNotification(loggedInUser._id, notification).then(
                (response) => {
                    console.log('saved? ', response);
                }
            );
        }
    }, [notification]);

    useEffect(() => {
        const socket = io('http://localhost:5005', {
            withCredentials: true,
        });

        socket.on('connect', () => {
            setCurrentSocket(socket);
        });

        socket.on('notify', () => {
            console.log('notification');
            setNotification(true);
        });

        loggedin()
            .then((response) => {
                if (response.data._id) {
                    const user = response.data;
                    setLoggedInUser(user);
                    setNotification(user.unreadMessages);
                    socket.emit('join', user._id);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoadingUser(false);
            });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getItems(searchParams.toString())
            .then((response) => {
                if (response.data.constructor !== Array) {
                    throw new Error(
                        'Received wrong data type from the server. Expected Array, but got ' +
                            response.data.constructor.name
                    );
                }
                setItems(response.data);
            })
            .catch((error) => {
                setItems([]);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchParams]);

    return (
        <div className='container'>
            <UserContext.Provider
                value={{
                    loadingUser,
                    loggedInUser,
                    setLoggedInUser,
                    currentSocket,
                    notification,
                    setNotification,
                }}
            >
                <SearchContext.Provider
                    value={{
                        isLoading,
                        setIsLoading,
                        searchParams,
                        setSearchParams,
                    }}
                >
                    <Header />

                    <SideBar />
                    <main className='main-content'>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Navigate to='/browse' replace={true} />
                                }
                            />
                            <Route
                                path='/browse'
                                element={<Browse items={items} />}
                            />
                            <Route
                                path='/items/:itemId'
                                element={<ItemDetails items={items} />}
                            />
                            <Route
                                path='/login'
                                element={
                                    loggedInUser ? (
                                        <Navigate to='/browse' />
                                    ) : (
                                        <LoginPage />
                                    )
                                }
                            />

                            <Route element={<ProtectedRoute />}>
                                <Route path='/create' element={<Create />} />
                                <Route
                                    path='/profile'
                                    element={<Profile user={loggedInUser} />}
                                />
                                <Route
                                    path='/messages'
                                    element={<ChatList />}
                                />
                                <Route
                                    path='/messages/:chatId'
                                    element={<Chat />}
                                />
                            </Route>
                            <Route path='*' element={<NoMatch />} />
                        </Routes>
                    </main>
                </SearchContext.Provider>
            </UserContext.Provider>
        </div>
    );
};

export default App;
