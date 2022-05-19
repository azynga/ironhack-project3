import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    return (
        <div className='item'>
            <div className='item-text'>
                <h3>{item.title}</h3>
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
            <div className='item-image'>
                <img className='item-image' src={item.images[0]} alt='' />
            </div>
        </div>
    );
};

export default ItemCard;
