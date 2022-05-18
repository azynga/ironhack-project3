import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../App';
import { updateUser } from '../services/user-service';
import LocationForm from './LocationForm';

const AccountSettings = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [location, setLocation] = useState(loggedInUser?.location);

    const handleSaveLocation = () => {
        updateUser(loggedInUser._id, { location })
            .then((response) => {
                if (!response.data._id) {
                    throw new Error('Error updating user');
                }
                const updatedUser = response.data;
                setLoggedInUser(updatedUser);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        setLocation(loggedInUser?.location);
    }, [loggedInUser]);

    return (
        <div className='account-settings'>
            <h2>Account settings</h2>
            <h3>Change your address: </h3>
            <LocationForm location={location} setLocation={setLocation} />
            <button onClick={handleSaveLocation}>Save</button>
        </div>
    );
};

export default AccountSettings;
