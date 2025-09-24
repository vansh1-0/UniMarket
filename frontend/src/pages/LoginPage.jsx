import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        authService.login(formData)
            .then((response) => {
                // Store user info and token in localStorage
                localStorage.setItem('user', JSON.stringify(response.data));
                alert('Login successful!');
                navigate('/marketplace'); // Redirect to marketplace on success
            })
            .catch((error) => {
                alert('Login failed: ' + error.response.data.msg);
            });
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="form-btn">Login</button>
                <Link to="/register" className="form-link">
                    Don't have an account? Register
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;