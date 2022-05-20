import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext, SearchContext } from '../App';
import { logout } from '../services/auth-service';
import { updateUser } from '../services/user-service';
import LoadingIcon from './LoadingIcon';

const NavBar = () => {
    const {
        loadingUser,
        loggedInUser,
        setLoggedInUser,
        notification,
        currentSocket: socket,
    } = useContext(UserContext);
    const { setSearchParams } = useContext(SearchContext);

    const handleLogout = () => {
        const storageData = {
            createFormData: JSON.parse(localStorage.getItem('createFormData')),
            selectedChat: JSON.parse(localStorage.getItem('selectedChat')),
        };

        updateUser(loggedInUser._id, { storageData })
            .then(() => {
                localStorage.clear();
                sessionStorage.clear();
                return logout();
            })
            .then(() => {
                socket.emit('leave', loggedInUser._id);
                setLoggedInUser(null);
                setSearchParams({});
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <nav className='nav row'>
            {loadingUser ? (
                <LoadingIcon />
            ) : loggedInUser ? (
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
                    <NavLink
                        to='/messages'
                        className={notification ? 'notify' : ''}
                    >
                        <i
                            title='Messages'
                            className='bi bi-chat-left'
                            role='img'
                            aria-label='Messages'
                        ></i>
                    </NavLink>

                    <button onClick={handleLogout}>
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
