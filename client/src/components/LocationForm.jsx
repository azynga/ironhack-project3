import React, { useState } from 'react';

import { getLocation } from '../services/geocode-service';

import LoadingIcon from './LoadingIcon';

const LocationForm = ({ location, setLocation }) => {
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddressSearch = (event) => {
        event.preventDefault();
        console.log(location);

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
                    response.data.features[0]?.properties?.address;

                if (!addressData.state) {
                    setErrorMessage('No location found');
                    return;
                } else {
                    setErrorMessage('');
                }

                const address = {
                    street: addressData.road || '',
                    houseNumber: addressData.house_number || '',
                    postalCode: addressData.postcode || '',
                    city: addressData.city || addressData.town,
                    state: addressData.state || '',
                };

                const addressLine =
                    (address.street && address.street + ' ') +
                    (address.houseNumber && address.houseNumber + ', ') +
                    (address.postalCode && address.postalCode + ' ') +
                    (address.city && address.city + ', ') +
                    address.state;

                address.addressLine = addressLine;

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
        <div className='location-form'>
            <fieldset className='col'>
                {loadingLocation ? (
                    <LoadingIcon color='white' />
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : location ? (
                    <p className='white'>
                        Selected address: <br />
                        <b>{location.address?.addressLine}</b>
                    </p>
                ) : (
                    <p>No address selected</p>
                )}
                <legend>Address (will not be public)</legend>
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
