import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';

import './App.scss';
import { getItems } from './services/item-service';
import { loggedin } from './services/auth-service';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Browse from './components/Browse';
import Create from './components/Create';
import NoMatch from './components/NoMatch';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

export const SearchContext = createContext();
export const UserContext = createContext();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({
        sort: 'date_desc',
        limit: 10,
    });

    useEffect(() => console.log(loggedInUser));

    useEffect(() => {
        loggedin()
            .then((response) => {
                // console.log(response);
                setLoggedInUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
            <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
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
                                    element={<h2>Profile</h2>}
                                />
                                <Route
                                    path='/messages'
                                    element={<h2>Messages</h2>}
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
