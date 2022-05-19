import React from 'react';
import Brand from './Brand';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

const Header = () => {
    return (
        <header className='header'>
            <Brand />
            <SearchBar />
            <NavBar />
        </header>
    );
};

export default Header;
