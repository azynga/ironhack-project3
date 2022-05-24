import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';

const ItemCard = ({ item }) => {
    return (
        <div className='item'>
            <div className='item-text'>
                <h3>{item.title}</h3>
                {/* <LikeButton itemId={item._id} /> */}
                <p>
                    <b>Tags: </b>
                    {item.tags}
                </p>
                <p>
                    <b>Price: </b>
                    {item.price}€
                </p>
                <Link to={'/items/' + item._id}>Details</Link>
            </div>
            <div className='item-image-container'>
                <img className='item-image' src={item.images[0]} alt='' />
            </div>
        </div>
    );
};

export default ItemCard;
