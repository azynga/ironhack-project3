import axios from 'axios';

const service = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/search',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
    },
});

const getLocation = (params) => {
    const { city, postalcode, street } = params;
    return service.get(
        `?format=geojson&country=deutschland&city=${city}&postalcode=${postalcode}&street=${street}&addressdetails=1`
    );
};

export { getLocation };
