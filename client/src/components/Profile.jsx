import React, { useEffect, useState } from 'react';
import { getAllItemsOfUser } from '../services/user-service';
import ItemCard from './ItemCard';

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
        <div>
            <h2>{user.username}</h2>
            <div className='item-list'>{itemList}</div>
        </div>
    );
};

export default Profile;
