import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../services/auth-service';
import { UserContext } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const {
        setLoggedInUser,
        setNotification,
        currentSocket: socket,
    } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        login(username, password)
            .then((response) => {
                const user = response.data;
                const createFormData = user.storageData?.createFormData;
                const selectedChat = user.storageData?.selectedChat;

                setLoggedInUser(user);
                socket.emit('join', user._id);
                setNotification(user.unreadMessages);

                createFormData &&
                    localStorage.setItem(
                        'createFormData',
                        JSON.stringify(createFormData)
                    );

                selectedChat &&
                    localStorage.setItem(
                        'selectedChat',
                        JSON.stringify(selectedChat)
                    );
                navigate('/browse');
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <div className='auth-form-container container col'>
            <h2>Login</h2>
            <form className='col' onSubmit={handleLogin}>
                <label htmlFor='login-username' className='visually-hidden'>
                    Username
                </label>
                <input
                    type='text'
                    name='username'
                    id='login-username'
                    placeholder='Username'
                    autoComplete='off'
                    autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label htmlFor='login-password' className='visually-hidden'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='login-password'
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button>Log in</button>
            </form>
            {errorMessage ? <div className='error'>{errorMessage}</div> : ''}
        </div>
    );
};

export default Login;
