import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchContext } from '../App';
import LoadingIcon from './LoadingIcon';

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { isLoading, searchParams, setSearchParams } =
        useContext(SearchContext);
    const currentPath = useLocation().pathname;

    useEffect(() => {
        // const lastSearch = JSON.parse(
        //     sessionStorage.getItem('searchParams')
        // ).search;

        if (currentPath === '/browse') {
            setSearch(
                searchParams.get('search') ||
                    JSON.parse(sessionStorage.getItem('searchParams'))
                        ?.search ||
                    searchParams.get('search') ||
                    ''
            );
        } else {
            setSearch('');
        }
        // const lastSearch = searchParams.get('search');
        // if (lastSearch) {
        //     setSearch(lastSearch);
        // } else {
        //     setSearch('');
        // }
    }, [currentPath, searchParams]);

    const handleSearch = (event) => {
        event.preventDefault();
        const newSearchParams = {
            ...Object.fromEntries(searchParams),
            search,
            limit: 10,
            sort: 'relevance',
        };

        if (currentPath === '/browse') {
            setSearchParams(newSearchParams);
        } else {
            navigate('/browse', {
                state: newSearchParams,
            });
        }
    };

    return (
        <div className='search-container row'>
            <form onSubmit={handleSearch}>
                <label className='visually-hidden' htmlFor='search-input'>
                    Search:
                </label>
                <input
                    className='search-input'
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    value={search}
                    type='text'
                    placeholder='Search...'
                    autoComplete='off'
                    autoFocus
                    onClick={(event) => event.target.select()}
                />
            </form>
            {isLoading ? <LoadingIcon /> : ''}
        </div>
    );
};

export default SearchBar;
