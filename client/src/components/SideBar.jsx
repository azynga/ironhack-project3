import React from 'react';
import SortButton from './SortButton';

const Sidebar = ({ searchParams, setSearchParams }) => {
    return (
        <aside id='sidebar' className='col'>
            <SortButton
                field={'relevance'}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <SortButton
                field={'price'}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <SortButton
                field={'date'}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </aside>
    );
};

export default Sidebar;
