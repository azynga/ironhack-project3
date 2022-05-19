import React from 'react';

const DistanceForm = ({ distance, setDistance, postalCode, setPostalCode }) => {
    const handlePostalCodeTyping = (event) => {
        const digitsOnly = event.target.value.match(/\d/g)?.join('');
        setPostalCode(digitsOnly || '');
    };

    return (
        <>
            <label htmlFor='distance'>Max distance:</label>
            <div className='distance-input-container'>
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
                <span>km</span>
            </div>
            <div className='postalcode-input-container'>
                <span>from</span>
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
            </div>
        </>
    );
};

export default DistanceForm;
