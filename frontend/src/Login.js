// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogInRegister.css'; // Ensure this CSS file is correctly imported
import { getCsrfToken } from './utils/csrf'; // Adjust the import path as needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const csrfToken = getCsrfToken();

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken // Include the CSRF token in the headers
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            // Redirect to contacts page on successful login
            navigate('/contacts');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleLogin}>
                <h1>Log In</h1>
                <div className="input-box">
                    <i className="bi bi-envelope icon"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <i className="bi bi-lock icon"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
