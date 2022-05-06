import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from './LoadingIcon';

const SearchBar = ({ isLoading, searchParams, setSearchParams }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const newSearchParams = { ...Object.fromEntries(searchParams), search };
        setSearchParams(newSearchParams);
    };

    // useEffect(() => {
    //     // navigate('/browse', { replace: true, state: { search: search } });
    //     handleSearch();
    // }, [search]);

    return (
        <div className='search row'>
            <form onSubmit={handleSearch}>
                <label className='visually-hidden' htmlFor='search-input'>
                    Search:
                </label>
                <input
                    id='search-input'
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
