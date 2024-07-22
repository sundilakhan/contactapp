// Main.js
import React from 'react';
import './main.css';
import backgroundImage from './Assets/background.webp';
import { Link } from 'react-router-dom';

const main = () => {
    return (
        <div className="main" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>Welcome to the Contact App</h1>
            <Link to="/login"><button>Log In</button></Link>
            <Link to="/register">
                <button>Resgister</button>
            </Link>
        </div>
    );
};

export default main;
