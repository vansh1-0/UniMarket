import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '', // Add phone state
    });

    const navigate = useNavigate();

    const { name, email, password, phone } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password || !phone) {
            alert('Please fill out all fields.');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (!email.endsWith('.edu.in')) {
            alert('Please use a valid university email ending in .edu.in');
            return;
        }

        authService.register(formData)
            .then((response) => {
                alert('Registration successful! Please log in.');
                navigate('/login');
            })
            .catch((error) => {
                const message = (error.response && error.response.data && error.response.data.msg) || 'Registration failed.';
                alert(message);
            });
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">University Email (.edu.in)</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={phone} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit" className="form-btn">Register</button>
                <Link to="/login" className="form-link">
                    Already have an account? Login
                </Link>
            </form>
        </div>
    );
}

export default RegisterPage;