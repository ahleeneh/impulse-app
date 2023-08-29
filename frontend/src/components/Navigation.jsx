import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Navigation({ username }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            console.log('User logged out!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="App-nav">
            <div className="nav-top">
                <h2>Impulse</h2>
                <Link to="/dashboard">
                    Dashboard
                </Link>
                <Link to="/budget">
                    Budget
                </Link>
            </div>

            <div className="nav-bottom">
                <p className="nav-username">{username}</p>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </nav>
    );

}

export default Navigation