import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    const style = {
        width: '100%',
        height: '100%',
    };

    return (
        <div style={style}>
            <div className={'item'}>
                This page does not exist. <br />
                <Link to='/browse'>
                    <b>Wanna keep browsing?</b>
                </Link>
            </div>
        </div>
    );
};

export default NoMatch;
