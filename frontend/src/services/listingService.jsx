import axios from 'axios';

const API_URL = 'http://localhost:5000/api/listings/';

// Get listings with optional search and category
const getListings = (search = '', category = 'All') => {
    return axios.get(API_URL, { params: { search, category } });
};

// Create a new listing
const createListing = (listingData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.post(API_URL, listingData, config);
};

const listingService = {
    getListings,
    createListing,
};

export default listingService;