import React, { useContext } from 'react';

import { SearchContext } from '../App';
import { Link } from 'react-router-dom';

const Brand = () => {
    const { searchParams } = useContext(SearchContext);

    return (
        <div className='brand'>
            <Link to={'/browse?' + searchParams.toString()}>
                <h1>sellie.</h1>
            </Link>
        </div>
    );
};

export default Brand;
