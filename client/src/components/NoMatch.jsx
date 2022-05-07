import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div className='item-list col'>
            <div className='item'>
                This page does not exist. <br />
                <Link to='/browse'>
                    <b>Wanna keep browsing?</b>
                </Link>
            </div>
        </div>
    );
};

export default NoMatch;
