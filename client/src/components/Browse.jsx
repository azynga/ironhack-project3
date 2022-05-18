import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

import { SearchContext } from '../App';
import ItemList from './ItemList';

const Browse = ({ items }) => {
    const initialRender = useRef(true);
    const { searchParams, setSearchParams } = useContext(SearchContext);
    const { state, search } = useLocation();

    const saveSearchParams = () => {
        sessionStorage.setItem(
            'searchParams',
            JSON.stringify(Object.fromEntries(searchParams))
        );
    };

    useEffect(() => {
        const storedSearchParams = JSON.parse(
            sessionStorage.getItem('searchParams')
        );

        setSearchParams({
            ...Object.fromEntries(searchParams),
            ...(storedSearchParams ? storedSearchParams : {}),
            ...(state ? state : {}),
        });
    }, []);

    useEffect(() => {
        if (!initialRender.current) {
            saveSearchParams();
        }
        initialRender.current = false;
    }, [search]);

    return (
        <>
            <ItemList items={items} />
        </>
    );
};

export default Browse;
