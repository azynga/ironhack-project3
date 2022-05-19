import React, { useContext } from 'react';
import { SearchContext } from '../App';
import LoadButton from './LoadButton';
import ItemCard from './ItemCard';

const ItemList = ({ items }) => {
    const { searchParams } = useContext(SearchContext);
    const endOfResults = items.length < parseInt(searchParams.get('limit'));

    const itemList = items?.map((item) => {
        return <ItemCard key={item._id} item={item} />;
    });

    return (
        <div className='item-list col'>
            {itemList}
            <LoadButton disabled={endOfResults} />
        </div>
    );
};

export default ItemList;
