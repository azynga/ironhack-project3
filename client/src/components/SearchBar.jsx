import React, { useState, useContext } from 'react';
import { SearchContext } from '../App';
import LoadingIcon from './LoadingIcon';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const { isLoading, searchParams, setSearchParams } =
        useContext(SearchContext);

    const handleSearch = (event) => {
        event.preventDefault();
        const newSearchParams = {
            ...Object.fromEntries(searchParams),
            search,
            limit: 10,
            sort: 'relevance',
        };
        setSearchParams(newSearchParams);
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
                />
            </form>
            {isLoading ? <LoadingIcon /> : ''}
        </div>
    );
};

export default SearchBar;
