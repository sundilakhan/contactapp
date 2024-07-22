import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogInRegister.css'; // Ensure this CSS file is correctly imported

const register = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [username, setUsername] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [role, setRole] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Replace with actual registration logic using fetch or axios
        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password,email,role }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="input-box">
                    <i className="bi bi-person icon"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <i className="bi bi-person icon"></i>
                    <input
                        type="text"
                        placeholder="ROLE_USER"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <i className="bi bi-envelope icon"></i>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Register</button>
            </form>
            <div className="register-link">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
};

export default register;
