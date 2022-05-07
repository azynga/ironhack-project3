import React from 'react';

const Item = ({ item }) => {
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
            </div>
            <div className='item-image'>
                <img className='item-image' src={item.images[0]} alt='' />
            </div>
        </div>
    );
};

export default Item;
