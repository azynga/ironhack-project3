import React, { useEffect, useState } from 'react';
import { getAllFavsOfUser } from '../services/user-service';
import ItemCard from './ItemCard';
import ProfileNav from './ProfileNav';

const Favorites = ({ user }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        getAllFavsOfUser(user._id)
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
            <main className='favorites'>
                <h2>{user.username}'s favorites</h2>
                <div className='item-list col'>{itemList}</div>
            </main>
        </>
    );
};

export default Favorites;
