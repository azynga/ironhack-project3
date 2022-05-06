import React from 'react';

const SortButton = ({ field, searchParams, setSearchParams }) => {
    const setSortParam = () => {
        if (field === 'relevance') {
            setSearchParams({
                ...Object.fromEntries(searchParams),
                sort: 'relevance',
            });
        } else {
            setSearchParams({
                ...Object.fromEntries(searchParams),
                sort:
                    searchParams.get('sort') === `${field}_asc`
                        ? `${field}_desc`
                        : `${field}_asc`,
            });
        }
    };

    const arrow = () => {
        const currentSortParam = searchParams.get('sort');
        return currentSortParam === `${field}_asc`
            ? ' ▲'
            : currentSortParam === `${field}_desc`
            ? ' ▼'
            : currentSortParam === field
            ? ' ▼'
            : '';
    };

    return (
        <button onClick={setSortParam}>
            {field}
            {arrow()}
        </button>
    );
};

export default SortButton;
