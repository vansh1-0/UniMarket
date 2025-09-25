import axios from 'axios';

const API_URL = 'http://localhost:5000/api/listings/';

// Get all listings
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

// Get a single listing by its ID
const getListing = (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.get(API_URL + listingId, config);
};

// Get listings for the current user
const getMyListings = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.get(API_URL + 'my-listings', config);
};

// Update a listing
const updateListing = (listingId, listingData, token) => {
    const config = {
        headers: {
            // Let the browser set the Content-Type header for FormData
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.put(API_URL + listingId, listingData, config);
};

// Delete a listing
const deleteListing = (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.delete(API_URL + listingId, config);
};

const listingService = {
    getListings,
    createListing,
    getListing,
    getMyListings,
    updateListing,
    deleteListing,
};

export default listingService;