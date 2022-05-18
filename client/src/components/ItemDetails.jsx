import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getOneItem } from '../services/item-service';
import { UserContext } from '../App';
import EnterChat from './EnterChat';
import LoadingIcon from './LoadingIcon';

const ItemDetails = () => {
    const { itemId } = useParams();
    const { loggedInUser, loadingUser } = useContext(UserContext);

    const [item, setItem] = useState(null);
    const [isOwn, setIsOwn] = useState(false);
    const [loadingItem, setLoadingItem] = useState(true);
    // const isOwn = item?.owner === loggedInUser?._id;

    // useEffect(() => {}, [loggedInUser]);

    useEffect(() => {
        getOneItem(itemId)
            .then((response) => {
                const item = response.data;
                if (!item?._id) {
                    throw new Error('Item not found');
                }
                setItem(item);
                setIsOwn(item.owner._id === loggedInUser?._id);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingItem(false);
            });
    }, [itemId, loadingUser]);

    const gallery = item?.images.map((image) => {
        return <img key={Math.random().toString(36)} src={image} alt='' />;
    });

    return loadingItem ? (
        <LoadingIcon />
    ) : !item ? (
        'Item not found'
    ) : (
        <div className='white'>
            <h2>{item.title}</h2>
            <div className='item-images'>{gallery}</div>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Tags: {item.tags}</p>
            <p>Price: {item.price}€</p>
            <p>
                {item.distance < 1000
                    ? '< 1'
                    : `~ ${Math.round(item.distance / 1000)}`}
                km away
            </p>

            {loadingItem || loadingUser || !loggedInUser ? (
                ''
            ) : isOwn ? (
                <button>Delete</button>
            ) : (
                <EnterChat otherUserId={item.owner._id}>
                    Contact {item.owner.username}
                </EnterChat>
            )}
        </div>
    );
};

export default ItemDetails;
