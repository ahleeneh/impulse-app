import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import homeImage from '../images/43.jpg';

function HomePage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', { username, password });
            console.log(response);
            navigate('/dashboard');
            toast.success(`Welcome back, ${username}!`, {icon: '👋'});
        } catch (error) {
            console.error(error);
            toast.error('Sorry, the provided username or password is incorrect.', {icon: '🚫'});
        }
    }


    return (
        <div className="page-container">

            <div className="image-container">
                <img src={homeImage} />
            </div>

            <div className="form-container">
                <form onSubmit={handleLogin}>

                    <h2>Sign in to Impulse</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <button type="submit">Login</button>

                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </form>
            </div>
        </div>
    );

}

export default HomePage;