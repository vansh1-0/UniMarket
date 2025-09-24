import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const register = (userData) => {
    return axios.post(API_URL + 'register', userData);
};

const login = (userData) => {
    return axios.post(API_URL + 'login', userData);
};

const updateProfile = (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.put(API_URL + 'profile', userData, config);
};

const authService = {
    register,
    login,
    updateProfile,
};

export default authService;