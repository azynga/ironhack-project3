import React, { useState, useContext, useEffect } from 'react';

import { getLocation } from '../services/geocode-service';
import { SearchContext, UserContext } from '../App';

import SortButton from './SortButton';
import LoadingIcon from './LoadingIcon';

const SearchSettings = () => {
    const { searchParams, setSearchParams } = useContext(SearchContext);
    const { loggedInUser } = useContext(UserContext);

    const [distance, setDistance] = useState(
        JSON.parse(sessionStorage.getItem('searchParams'))?.distance || 15
        // searchParams.get('distance') || 15
    );
    const [postalCode, setPostalCode] = useState(
        JSON.parse(sessionStorage.getItem('searchParams'))?.postalcode || ''
    );
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleApplySettings = (event) => {
        event.preventDefault();
        setLoadingLocation(true);
        getLocation({ city: '', street: '', postalcode: postalCode })
            .then((response) => {
                if (!response.data.features[0]) {
                    throw new Error('Postalcode not found');
                }
                const { coordinates } = response.data.features[0].geometry;
                setSearchParams({
                    ...Object.fromEntries(searchParams),
                    postalcode: postalCode,
                    distance,
                    long: coordinates[0],
                    lat: coordinates[1],
                });
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingLocation(false);
            });
    };

    const handlePostalCodeTyping = (event) => {
        const digitsOnly = event.target.value.match(/\d/g)?.join('');
        setPostalCode(digitsOnly || '');
    };

    const handleResetSearch = () => {
        sessionStorage.clear();
        setSearchParams({});
        setDistance(15);
        setPostalCode('');
    };

    useEffect(() => {
        if (
            !loggedInUser ||
            (searchParams.has('long') && searchParams.has('lat'))
        ) {
            return;
        }
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
                <button>{loadingLocation ? <LoadingIcon /> : 'Apply'}</button>
            </form>

            <button onClick={handleResetSearch}>Reset search</button>
        </>
    );
};

export default SearchSettings;
