import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

const LoginPage = () => {
    return (
        <div className='login-page row'>
            <Login />
            <div
                className='divider'
                style={{
                    height: '100%',
                    borderLeft: 'solid 1px white',
                }}
            ></div>
            <Signup />
        </div>
    );
};

export default LoginPage;
