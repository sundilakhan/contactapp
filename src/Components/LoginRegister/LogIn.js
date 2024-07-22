import React, { useState } from 'react';
import './LogInRegister.css';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Successful login
        setIsAuthenticated(true);
        navigate('/contacts');
      } else {
        // Invalid credentials
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="container whole">
      <div className='wrapper'>
        <div className='form-box login'>
          <form onSubmit={handleLogin}>
            <h1>LogIn</h1>
            <div className='input-box'>
              <i className="bi bi-person icon2"></i>
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className='input-box'>
              <i className="bi bi-lock icon2"></i>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit">LogIn</button>
            <div className='register-link'>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
