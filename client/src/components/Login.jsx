import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../services/auth-service';
import { UserContext } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        login(username, password)
            .then((response) => {
                console.log(response);
                setLoggedInUser(response.data);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.response.data.errorMessage);
            });
    };

    return (
        <div className='login'>
            <form className='col' onSubmit={handleLogin}>
                <label htmlFor='username' className='visually-hidden'>
                    Username
                </label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Username'
                    autoComplete='off'
                    autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label htmlFor='password' className='visually-hidden'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button>Log in</button>
            </form>
            {errorMessage ? (
                <div className='error white'>{errorMessage}</div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Login;
