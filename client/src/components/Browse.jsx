import React from 'react';
import ItemList from './ItemList';

const Browse = ({ items, searchParams, setSearchParams }) => {
    console.log(searchParams, items);
    console.log(searchParams.toString());

    return (
        <>
            <ItemList items={items} />
            <button
                onClick={() => {
                    const newSearchParams = {
                        ...Object.fromEntries(searchParams),
                        limit: parseInt(searchParams.get('limit')) + 20,
                    };
                    setSearchParams(newSearchParams);
                }}
            >
                Load more
            </button>
        </>
    );
};

export default Browse;
