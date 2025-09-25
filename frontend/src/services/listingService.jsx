import axios from 'axios';

const API_URL = 'http://localhost:5000/api/listings/';

// Get listings with optional search and category
const getListings = (search = '', category = 'All') => {
    return axios.get(API_URL, { params: { search, category } });
};

const listingService = {
    getListings,
};

export default listingService;