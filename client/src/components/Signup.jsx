import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../services/auth-service';
import { UserContext } from '../App';
import LocationForm from './LocationForm';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    const { setLoggedInUser, currentSocket: socket } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        if (!location.address.state) {
            setErrorMessage('Please enter your address');
            return;
        }
        signup(username, password, location)
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
        <div className='auth-form-container container col'>
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
                    maxLength={15}
                    onChange={(event) => setUsername(event.target.value)}
                    required
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
                    required
                />
                <LocationForm location={location} setLocation={setLocation} />
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
