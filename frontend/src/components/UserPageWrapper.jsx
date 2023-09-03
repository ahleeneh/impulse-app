import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

// UserPageWrapper is a higher-order component that wraps user-specific pages
// Handles user authentication and rendering of child components
function UserPageWrapper({ children, pageName }) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Verify the authentication of a user and set the authenticated state and username
    const checkAuthentication = async () => {
        try {
            // Send a GET request to check authentication status
            const response = await axios.get('/user')
            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(response.data.username);
            }
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        // When the component mounts, check authentication status
        checkAuthentication();
    }, []);

    return (
        <div className="page-container-user">
            <Navigation username={username} />
            <div className="App-content">
                <div className="max-width-content">
                    <h1>{pageName}</h1>
                    {authenticated ? children : null}
                </div>
            </div>
        </div>
    );

}

export default UserPageWrapper;