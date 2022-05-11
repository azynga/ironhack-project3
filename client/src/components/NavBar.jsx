import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../App';
import { logout } from '../services/auth-service';

const NavBar = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    // console.log(loggedInUser);
    return (
        <nav className='nav row'>
            {loggedInUser ? (
                <>
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
                    {/* <button
                        onClick={() => {
                            logout().then((response) => {
                                console.log(response);
                                setLoggedInUser(null);
                            });
                        }}
                    >
                        Logout
                    </button> */}
                    {/* <NavLink to='/logout'> */}
                    <button
                        onClick={() => {
                            logout().then((response) => {
                                console.log(response);
                                setLoggedInUser(null);
                            });
                        }}
                    >
                        <i
                            title='Logout'
                            className='bi bi-box-arrow-right'
                            role='img'
                            aria-label='Logout'
                        ></i>
                    </button>
                    {/* </NavLink> */}
                </>
            ) : (
                <NavLink className='login' to='/login'>
                    Login
                    <i
                        title='Login'
                        className='bi bi-box-arrow-in-right'
                        role='img'
                        aria-label='Login'
                    ></i>
                </NavLink>
            )}
        </nav>
    );
};

export default NavBar;
