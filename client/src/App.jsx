import { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';

import './App.scss';
import { getItems } from './services/item-service';
import Browse from './components/Browse';
import Header from './components/Header';
import SideBar from './components/SideBar';
import NoMatch from './components/NoMatch';

const App = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({ limit: 20 });

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
        <div className='app col'>
            <Header
                isLoading={isLoading}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <div className='main-container row'>
                <SideBar
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />

                <main id='main-content'>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/browse' replace={true} />}
                        />
                        <Route
                            path='/browse'
                            element={
                                <Browse
                                    items={items}
                                    searchParams={searchParams}
                                    setSearchParams={setSearchParams}
                                />
                            }
                        />
                        <Route path='*' element={<NoMatch />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
