import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../App';
import { updateUser } from '../services/user-service';
import LocationForm from './LocationForm';
import ProfileNav from './ProfileNav';

const AccountSettings = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [location, setLocation] = useState(loggedInUser?.location);
    const [saved, setSaved] = useState(false);

    const handleSaveLocation = () => {
        updateUser(loggedInUser._id, { location })
            .then((response) => {
                if (!response.data._id) {
                    throw new Error('Error updating user');
                }
                const updatedUser = response.data;
                setSaved(true);
                setLoggedInUser(updatedUser);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        setLocation(loggedInUser?.location);
    }, [loggedInUser]);

    return (
        <>
            <aside>
                <ProfileNav />
            </aside>
            <main className='account-settings'>
                <h2>Account settings</h2>
                <div className='container'>
                    <h3>Change your address: </h3>
                    <LocationForm
                        location={location}
                        setLocation={setLocation}
                    />
                    <button onClick={handleSaveLocation}>Save</button>
                    {saved ? (
                        <p>Address saved successfully.</p>
                    ) : (
                        <p>
                            {' '}
                            <br />
                        </p>
                    )}
                </div>
            </main>
        </>
    );
};

export default AccountSettings;
