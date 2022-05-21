import React, { useEffect, useState } from 'react';
import { getAllItemsOfUser } from '../services/user-service';
import ItemCard from './ItemCard';
import ProfileNav from './ProfileNav';

const Profile = ({ user }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        getAllItemsOfUser(user._id)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const itemList = items?.map((item) => {
        return <ItemCard key={item._id} item={item} />;
    });

    return (
        <>
            <aside className='sidebar'>
                <ProfileNav />
            </aside>
            <main className='profile'>
                <h2>{user.username}'s items</h2>
                <div className='item-list col'>{itemList}</div>
            </main>
        </>
    );
};

export default Profile;
