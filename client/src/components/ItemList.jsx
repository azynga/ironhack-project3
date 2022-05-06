import React from 'react';

const ItemList = ({ items }) => {
    const itemList = items?.map((item) => {
        return (
            <div key={item._id} className='item'>
                <h3>{item.title}</h3>
                <p>{item.tags}</p>
                <p>Price: {item.price}€</p>
            </div>
        );
    });

    return (
        <div id='item-list' className='col'>
            {itemList}
        </div>
    );
};

export default ItemList;
