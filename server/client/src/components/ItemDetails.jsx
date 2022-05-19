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

    const gallery = item?.images.map((image, index) => {
        return (
            <img
                key={Math.random().toString(36)}
                className={index === 0 ? 'first-image' : ''}
                src={image}
                alt=''
            />
        );
    });

    return loadingItem ? (
        <LoadingIcon />
    ) : !item ? (
        'Item not found'
    ) : (
        <main className='item-details main-fill'>
            <h2>{item.title}</h2>
            <div className='item-details-container'>
                <div className='item-images'>{gallery}</div>
                <p>
                    <b>Category:</b> {item.category}
                </p>
                <p>
                    <b>Description:</b> {item.description}
                </p>
                <p>
                    <b>Tags:</b> {item.tags}
                </p>
                <p>
                    <b>Price:</b> {item.price}€
                </p>
                <p>
                    {item.distance < 1000
                        ? '< 1'
                        : `~ ${Math.round(item.distance / 1000)}`}
                    km away from {loggedInUser.location.address.addressLine}
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
        </main>
    );
};

export default ItemDetails;
