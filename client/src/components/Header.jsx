import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ isLoading, searchParams, setSearchParams }) => {
    return (
        <header className='row'>
            <Link to='/'>
                <h1>sellie.</h1>
            </Link>
            <SearchBar
                isLoading={isLoading}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <nav className='row'>
                <NavLink to='/create'>
                    <i
                        title='Create an ad'
                        class='bi bi-plus-square'
                        role='img'
                        aria-label='Create an ad'
                    ></i>
                </NavLink>
                <NavLink to='/profile'>
                    <i
                        title='Profile'
                        class='bi bi-person-square'
                        role='img'
                        aria-label='Profile'
                    ></i>
                </NavLink>
                <NavLink to='/messages'>
                    <i
                        title='Messages'
                        class='bi bi-chat-left'
                        role='img'
                        aria-label='Messages'
                    ></i>
                </NavLink>
                <NavLink to='/logout'>
                    <i
                        title='Logout'
                        class='bi bi-box-arrow-right'
                        role='img'
                        aria-label='Logout'
                    ></i>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
