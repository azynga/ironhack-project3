import React from 'react';

import ItemList from './ItemList';
import LoadButton from './LoadButton';

const Browse = ({ items }) => {
    return (
        <>
            <ItemList items={items} />
            <LoadButton />
        </>
    );
};

export default Browse;
