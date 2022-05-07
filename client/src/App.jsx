import { useState, useEffect, createContext } from 'react';
import {
    Routes,
    Route,
    useSearchParams,
    Navigate,
    useNavigate,
} from 'react-router-dom';

import './App.scss';
import { getItems } from './services/item-service';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Browse from './components/Browse';
import Create from './components/Create';
import NoMatch from './components/NoMatch';

export const SearchContext = createContext();

const App = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({
        sort: 'date_desc',
        limit: 10,
    });
    const navigate = useNavigate();

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
                        <Route path='/create' element={<Create />} />
                        <Route path='*' element={<NoMatch />} />
                    </Routes>
                </main>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
