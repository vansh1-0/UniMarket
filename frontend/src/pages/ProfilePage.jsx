// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

function ProfilePage({ handleLogout }) { // <-- Accept handleLogout as a prop
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [user, setUser] = useState(null);

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

    const onUpdate = (e) => {
        e.preventDefault();
        if (user && user.token) {
            authService.updateProfile(formData, user.token)
                .then((response) => {
                    const updatedUser = { ...user, user: response.data };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    alert('Profile updated successfully!');
                })
                .catch((error) => {
                    alert('Update failed: ' + error.response.data.msg);
                });
        }
    };

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            if (user && user.token) {
                authService.deleteProfile(user.token)
                    .then(() => {
                        alert('Account deleted successfully.');
                        handleLogout(); // Log the user out
                    })
                    .catch((error) => {
                        alert('Failed to delete account: ' + error.response.data.msg);
                    });
            }
        }
    };

    return (
        <div className="form-container">
            <h2>My Profile</h2>
            <form onSubmit={onUpdate}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">University Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                </div>
                <button type="submit" className="form-btn">Update Profile</button>
            </form>

            <button onClick={onDelete} className="form-btn delete-btn">
                Delete Account
            </button>
        </div>
    );
}

export default ProfilePage;