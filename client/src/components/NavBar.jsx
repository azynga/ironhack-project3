import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='nav row'>
            <NavLink to='/create'>
                <i
                    title='Create an ad'
                    className='bi bi-plus-square'
                    role='img'
                    aria-label='Create an ad'
                ></i>
            </NavLink>
            <NavLink to='/profile'>
                <i
                    title='Profile'
                    className='bi bi-person-square'
                    role='img'
                    aria-label='Profile'
                ></i>
            </NavLink>
            <NavLink to='/messages'>
                <i
                    title='Messages'
                    className='bi bi-chat-left'
                    role='img'
                    aria-label='Messages'
                ></i>
            </NavLink>
            <NavLink to='/logout'>
                <i
                    title='Logout'
                    className='bi bi-box-arrow-right'
                    role='img'
                    aria-label='Logout'
                ></i>
            </NavLink>
        </nav>
    );
};

export default NavBar;
