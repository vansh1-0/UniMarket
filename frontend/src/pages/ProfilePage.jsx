import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [user, setUser] = useState(null);

    // Load user data from localStorage when the page loads
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setFormData({
                name: storedUser.user.name,
                email: storedUser.user.email,
            });
        }
    }, []);

    const { name, email } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (user && user.token) {
            authService.updateProfile(formData, user.token)
                .then((response) => {
                    const updatedUser = {
                        ...user,
                        user: response.data,
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    alert('Profile updated successfully!');
                })
                .catch((error) => {
                    alert('Update failed: ' + error.response.data.msg);
                });
        }
    };

    return (
        <div className="form-container">
            <h2>My Profile</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">University Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="form-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;