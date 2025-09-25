import axios from 'axios';

const API_URL = 'http://localhost:5000/api/listings/';

// Get all listings
const getListings = () => {
    return axios.get(API_URL);
};

const listingService = {
    getListings,
};

export default listingService;