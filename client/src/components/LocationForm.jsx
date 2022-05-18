import React, { useState } from 'react';

import { getLocation } from '../services/geocode-service';

import LoadingIcon from './LoadingIcon';

const LocationForm = ({ location, setLocation }) => {
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleAddressSearch = (event) => {
        event.preventDefault();
        setLoadingLocation(true);
        getLocation({
            street,
            postalcode: postalCode,
            city,
            country: 'deutschland',
        })
            .then((response) => {
                const result = response.data.features[0];
                const addressData =
                    response.data.features[0].properties.address;

                const address = {
                    street: addressData.road || '',
                    houseNumber: addressData.house_number || '',
                    postalCode: addressData.postcode || '',
                    city: addressData.city || addressData.town,
                    state: addressData.state,
                };

                const formattedResult = {
                    address,
                    geometry: result.geometry,
                };
                setLocation(formattedResult);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoadingLocation(false);
            });
    };

    return (
        <div>
            <fieldset>
                {loadingLocation ? (
                    <LoadingIcon color='white' />
                ) : location ? (
                    <p className='white'>
                        Selected address: <br />
                        <b>
                            {location.address.street &&
                                location.address.street + ' '}
                            {location.address.houseNumber &&
                                location.address.houseNumber + ', '}
                            {location.address.postalCode &&
                                location.address.postalCode + ' '}
                            {location.address.city &&
                                location.address.city + ', '}
                            {location.address.state}
                        </b>
                    </p>
                ) : (
                    'No address selected'
                )}
                <legend>Address (will be hidden)</legend>
                <label htmlFor='street' className='visually-hidden'>
                    Street, House number
                </label>
                <input
                    type='text'
                    id='street'
                    onChange={(event) => setStreet(event.target.value)}
                    onKeyDown={(event) =>
                        event.key === 'Enter' && handleAddressSearch(event)
                    }
                    value={street}
                    placeholder='Street, House number'
                />

                <label htmlFor='postal-code' className='visually-hidden'>
                    Postal code
                </label>
                <input
                    type='text'
                    id='postal-code'
                    onChange={(event) => setPostalCode(event.target.value)}
                    onKeyDown={(event) =>
                        event.key === 'Enter' && handleAddressSearch(event)
                    }
                    value={postalCode}
                    placeholder='Postal code'
                />

                <label htmlFor='city' className='visually-hidden'>
                    City
                </label>
                <input
                    type='text'
                    id='city'
                    onChange={(event) => setCity(event.target.value)}
                    onKeyDown={(event) =>
                        event.key === 'Enter' && handleAddressSearch(event)
                    }
                    value={city}
                    placeholder='City'
                />
                <button onClick={handleAddressSearch}>Search</button>
            </fieldset>
        </div>
    );
};

export default LocationForm;
