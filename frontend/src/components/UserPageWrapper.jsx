import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function UserPageWrapper({ children, pageName }) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const checkAuthentication = async () => {
        try {
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
        checkAuthentication();
    }, []);

    

    return (
        <div className="page-container-user">
            <Navigation username={username} />
            <div className="App-content">
                <h1>{pageName}</h1>
                {authenticated ? children : null}
            </div>
        </div>
    );

}

export default UserPageWrapper;