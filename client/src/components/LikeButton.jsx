import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../App';

import { updateUser } from '../services/user-service';
// import { updateItem } from '../services/item-service';

const LikeButton = ({ itemId }) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(loggedInUser.favoriteItems.includes(itemId));
    }, [loggedInUser]);

    useEffect(() => {
        console.log(loggedInUser.favoriteItems);
    }, [liked]);

    const handleLike = () => {
        if (!liked) {
            updateUser(loggedInUser._id, { $push: { favoriteItems: itemId } })
                .then((response) => {
                    const updatedUser = response.data;
                    setLoggedInUser(updatedUser);
                    setLiked(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            updateUser(loggedInUser._id, { $pull: { favoriteItems: itemId } })
                .then((response) => {
                    const updatedUser = response.data;
                    setLoggedInUser(updatedUser);
                    setLiked(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div onClick={handleLike}>
            {liked ? (
                <i
                    title='Unlike'
                    className='bi bi-heart-fill like'
                    role='img'
                    aria-label='Unlike'
                ></i>
            ) : (
                <i
                    title='Like'
                    className='bi bi-heart unlike'
                    role='img'
                    aria-label='Like'
                ></i>
            )}
        </div>
    );
};

export default LikeButton;
