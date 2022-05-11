import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { SearchContext } from '../App';
import ItemList from './ItemList';

const Browse = ({ items }) => {
    const { setSearchParams } = useContext(SearchContext);
    const { state } = useLocation();

    useEffect(() => {
        state && setSearchParams(state);
    }, []);

    return (
        <>
            <ItemList items={items} />
        </>
    );
};

export default Browse;
