import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../services/auth-service';
import { UserContext } from '../App';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { setLoggedInUser, currentSocket: socket } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        signup(username, password)
            .then((response) => {
                const user = response.data;
                setLoggedInUser(user);
                socket.emit('join', user._id);

                navigate('/browse');
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.response.data.errorMessage);
            });
    };

    return (
        <div className='auth-form col'>
            <h2>Sign up</h2>
            <form className='col' onSubmit={handleSignup}>
                <label htmlFor='signup-username' className='visually-hidden'>
                    Username
                </label>
                <input
                    type='text'
                    name='username'
                    id='signup-username'
                    placeholder='Username'
                    autoComplete='off'
                    // autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label htmlFor='signup-password' className='visually-hidden'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='signup-password'
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button>Sign up</button>
            </form>
            {errorMessage ? (
                <div className='error white'>{errorMessage}</div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Signup;
