import React, { useState, useContext, useEffect } from 'react';
import SortButton from './SortButton';

import { SearchContext, UserContext } from '../App';

const SearchSettings = () => {
    const { searchParams, setSearchParams } = useContext(SearchContext);
    const { loggedInUser } = useContext(UserContext);

    const [distance, setDistance] = useState(
        searchParams.get('distance') || 15
    );
    const [postalCode, setPostalCode] = useState(10117);

    const handleApplySettings = (event) => {
        event.preventDefault();
        setSearchParams({ ...Object.fromEntries(searchParams), distance });
        console.log(distance);
    };

    const handlePostalCodeTyping = (event) => {
        const digitsOnly = event.target.value.match(/\d/g)?.join('');
        setPostalCode(digitsOnly || '');
    };

    useEffect(() => {
        if (!loggedInUser) {
            return;
        }
        console.log('user', loggedInUser);
        setPostalCode(loggedInUser.location.address.postalCode);
    }, [loggedInUser]);

    return (
        <>
            <SortButton field={'relevance'} />
            <SortButton field={'price'} />
            <SortButton field={'date'} />

            <form onSubmit={handleApplySettings}>
                <label htmlFor='distance'>
                    Max distance
                    <input
                        type='range'
                        name='distance'
                        min={1}
                        max={100}
                        step={1}
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                    />
                    <input
                        type='number'
                        name='distance'
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                    />
                </label>
                <br />
                km from
                <br />
                <label htmlFor='postal-code' className='visually-hidden'>
                    Postal code
                </label>
                <input
                    type='text'
                    name='postal-code'
                    id='postal-code'
                    placeholder='Postal code'
                    required
                    minLength={5}
                    maxLength={5}
                    value={postalCode}
                    onChange={handlePostalCodeTyping}
                />
                <button>Apply</button>
            </form>
        </>
    );
};

export default SearchSettings;
