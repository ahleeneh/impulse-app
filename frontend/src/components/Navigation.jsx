import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// Navigation component for user-specific pages
function Navigation({ username }) {
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            // Send a POST request to logout a user
            await axios.post('/user/logout');

            // If successful, navigate to the home page/login form
            navigate('/');

            // Display a toast success notification
            toast.success('Goodbye!', {icon: '👋'});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="App-nav">
            <div className="nav-top">
                <h2>Impulse</h2>
                <Link to="/dashboard" className="nav-link-container">
                    <GridViewRoundedIcon />
                    <p>Dashboard</p>
                </Link>
                <Link to="/budget" className="nav-link-container">
                    <WalletRoundedIcon />
                    <p>Budget</p>
                </Link>
            </div>

            <div className="nav-bottom">
                <p className="nav-username nav-link-container">
                    <AccountCircleRoundedIcon />
                    {username}
                </p>
                <span onClick={handleLogout} className="nav-link-container">
                    <LogoutRoundedIcon />
                    <p>Logout</p>
                </span>
            </div>
        </nav>
    );

}

export default Navigation