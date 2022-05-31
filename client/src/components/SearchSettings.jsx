import React, { useState, useContext, useEffect } from 'react';

import { SearchContext, UserContext } from '../App';
import { getLocation } from '../services/geocode-service';

import SortButton from './SortButton';
import DistanceForm from './DistanceForm';
import CategorySelect from './CategorySelect';
import LoadingIcon from './LoadingIcon';

const SearchSettings = () => {
    const { searchParams, setSearchParams } = useContext(SearchContext);
    const { loggedInUser } = useContext(UserContext);

    const [distance, setDistance] = useState(
        JSON.parse(sessionStorage.getItem('searchParams'))?.distance || 15
    );
    const [postalCode, setPostalCode] = useState(
        JSON.parse(sessionStorage.getItem('searchParams'))?.postalcode || ''
    );

    const [category, setCategory] = useState('');

    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleResetSearch = () => {
        sessionStorage.clear();
        setDistance(15);
        setPostalCode('');
        setSearchParams({});
    };

    const handleApplyFilter = (event) => {
        event.preventDefault();

        const newSearchParams = {
            ...Object.fromEntries(searchParams),
            limit: 10,
        };

        if (!postalCode) {
            newSearchParams.postalcode = '';
            newSearchParams.long =
                loggedInUser?.location.geometry.coordinates[0] || '';
            newSearchParams.lat =
                loggedInUser?.location.geometry.coordinates[1] || '';
            newSearchParams.category = category;
            setSearchParams(newSearchParams);
            return;
        }

        setLoadingLocation(true);
        getLocation({ city: '', street: '', postalcode: postalCode })
            .then((response) => {
                newSearchParams.distance = distance;
                newSearchParams.category = category;
                if (!response.data.features[0]) {
                    console.error('Postalcode not found');
                    setPostalCode('');
                } else {
                    const { coordinates } = response.data.features[0].geometry;
                    newSearchParams.long = coordinates[0];
                    newSearchParams.lat = coordinates[1];
                    newSearchParams.postalcode = postalCode;
                }

                setSearchParams(newSearchParams);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingLocation(false);
            });
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
        <div className='search-settings col'>
            <fieldset>
                <legend>Sort</legend>
                <SortButton field={'relevance'} />
                <SortButton field={'price'} />
                <SortButton field={'date'} />
            </fieldset>

            <form onSubmit={handleApplyFilter}>
                <fieldset>
                    <legend>Filter</legend>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        isFilter={true}
                    />

                    <DistanceForm
                        distance={distance}
                        setDistance={setDistance}
                        postalCode={postalCode}
                        setPostalCode={setPostalCode}
                    />
                    <button className='apply-filter'>
                        {loadingLocation ? <LoadingIcon /> : 'Apply'}
                    </button>
                </fieldset>
            </form>

            <button onClick={handleResetSearch}>Reset search</button>
        </div>
    );
};

export default SearchSettings;
