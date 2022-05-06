import React from 'react';
import SortButton from './SortButton';

const Sidebar = ({ searchParams, setSearchParams }) => {
    return (
        <aside className='sidebar col'>
            <SortButton field={'relevance'} />
            <SortButton field={'price'} />
            <SortButton field={'date'} />
        </aside>
    );
};

export default Sidebar;
