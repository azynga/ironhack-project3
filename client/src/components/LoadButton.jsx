import React, { useContext } from 'react';
import { SearchContext } from '../App';
import LoadingIcon from './LoadingIcon';

const LoadButton = ({ disabled }) => {
    const { searchParams, setSearchParams, isLoading } =
        useContext(SearchContext);

    return (
        <button
            onClick={() => {
                const newSearchParams = {
                    ...Object.fromEntries(searchParams),
                    limit: parseInt(searchParams.get('limit')) + 10,
                };
                setSearchParams(newSearchParams);
            }}
            disabled={disabled}
        >
            {disabled ? (
                isLoading ? (
                    <LoadingIcon />
                ) : (
                    'No more results'
                )
            ) : (
                'Load more'
            )}
        </button>
    );
};

export default LoadButton;
