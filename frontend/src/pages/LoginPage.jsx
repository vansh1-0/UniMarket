import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage({ setUser }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        
        authService.login(formData)
            .then((response) => {
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                alert('Login successful!');
                navigate('/');
            })
            .catch((error) => {
                // Get the error message from the server response, or show a generic message
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.msg) ||
                    'Login failed. Please check your credentials and try again.';
                
                alert(message); // Show error message to the user
            })
            .finally(() => {
                setLoading(false); // Set loading back to false after request is complete
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
                {/* Disable button while loading */}
                <button type="submit" className="form-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/register" className="form-link">
                    Don't have an account? Register
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;