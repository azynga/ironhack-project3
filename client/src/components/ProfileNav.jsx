import React from 'react';
import { Link } from 'react-router-dom';

const ProfileNav = () => {
    return (
        <div className='profile-nav col'>
            <Link to='/profile'>Your Ads</Link>
            <Link to='/profile/settings'>Settings</Link>
        </div>
    );
};

export default ProfileNav;
