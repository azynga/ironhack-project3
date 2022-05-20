import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import './App.scss';
import { getItems } from './services/item-service';
import { loggedin } from './services/auth-service';
import { saveNotification } from './services/user-service';
import Header from './components/Header';
import Browse from './components/Browse';
import SearchSettings from './components/SearchSettings';
import ItemDetails from './components/ItemDetails';
import Create from './components/Create';
import NoMatch from './components/NoMatch';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import NavigateToSelectedChat from './components/NavigateToSelectedChat';
import Profile from './components/Profile';
import ProfileNav from './components/ProfileNav';
import AccountSettings from './components/AccountSettings';

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
        distance: 15,
        long: 13.3888599,
        lat: 52.5170365,
    });

    // useEffect(() => {
    //     console.log('search params: ', searchParams.toString());
    // });

    useEffect(() => {
        if (loggedInUser) {
            saveNotification(loggedInUser._id, notification)
                .then(() => {
                    console.log('notification saved');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [notification]);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BASE_URL, {
            withCredentials: true,
        });

        socket.on('connect', () => {
            setCurrentSocket(socket);
        });

        socket.on('notify', () => {
            setNotification(true);
        });

        loggedin()
            .then((response) => {
                if (response.data._id) {
                    const user = response.data;
                    setLoggedInUser(user);
                    const { coordinates } = user.location.geometry;
                    if (!searchParams.has('long') || !searchParams.has('lat')) {
                        setSearchParams({
                            ...Object.fromEntries(searchParams),
                            long: coordinates[0],
                            lat: coordinates[1],
                        });
                    }
                    setNotification(user.unreadMessages);
                    socket.emit('join', user._id);
                }
            })
            .catch((error) => {
                console.error(error);
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
                    console.error(response);
                    throw new Error(
                        'Received wrong data type from the server. Expected Array, but got ' +
                            response.data.constructor.name
                    );
                }
                setItems(response.data);
            })
            .catch((error) => {
                setItems([]);
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchParams]);

    return (
        <div className='app-container'>
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

                    {/* <SideBar /> */}
                    <div className='main-content-container'>
                        {/* <aside className='sidebar col'>
                            <Routes>
                                <Route
                                    path='/browse'
                                    element={<SearchSettings />}
                                />

                                <Route element={<ProtectedRoute />}>
                                    <Route
                                        path='/profile/*'
                                        element={<ProfileNav />}
                                    />
                                    <Route
                                        path='/messages/*'
                                        element={<ChatList />}
                                    />
                                </Route>
                                <Route path='*' element={<></>} />
                            </Routes>
                        </aside> */}
                        <Routes>
                            <Route
                                path='/'
                                element={<Navigate to={'/browse'} />}
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
                                        <Navigate
                                            to='/browse'
                                            state={{
                                                test: 'blabla',
                                                // ...Object.fromEntries(
                                                //     searchParams
                                                // ),
                                            }}
                                        />
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
                                    path='/profile/settings'
                                    element={<AccountSettings />}
                                />
                                <Route
                                    path='/messages'
                                    element={<NavigateToSelectedChat />}
                                />
                                <Route
                                    path='/messages/:chatId'
                                    element={<Chat />}
                                />
                            </Route>
                            <Route path='*' element={<NoMatch />} />
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </UserContext.Provider>
        </div>
    );
};

export default App;
