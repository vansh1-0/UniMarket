import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/wishlist/';

const addToWishlist = (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.post(API_URL + listingId, {}, config);
};

const removeFromWishlist = (listingId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.delete(API_URL + listingId, config);
};

const getWishlist = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.get(API_URL, config);
};

const wishlistService = {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};

export default wishlistService;