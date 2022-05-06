import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';

import './App.scss';
import { getItems } from './services/item-service';
import Browse from './components/Browse';
import Header from './components/Header';
import SideBar from './components/SideBar';
import NoMatch from './components/NoMatch';

export const SearchContext = createContext();

const App = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

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
                            element={<Navigate to='/browse' replace={true} />}
                        />
                        <Route
                            path='/browse'
                            element={<Browse items={items} />}
                        />

                        <Route path='*' element={<NoMatch />} />
                    </Routes>
                </main>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
