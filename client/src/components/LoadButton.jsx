import React, { useContext } from 'react';
import { SearchContext } from '../App';

const LoadButton = () => {
    const { searchParams, setSearchParams } = useContext(SearchContext);

    return (
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
    );
};

export default LoadButton;
