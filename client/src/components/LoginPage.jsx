import React from 'react';

import Login from './Login';
import Signup from './Signup';

const LoginPage = () => {
    return (
        <main className='login-page main-fill row'>
            <div className='login-page-container'>
                <Login />
                {/* <div
                className='divider'
                style={{
                    height: '100%',
                    borderLeft: 'solid 1px white',
                }}
            ></div> */}
                <Signup />
            </div>
        </main>
    );
};

export default LoginPage;
