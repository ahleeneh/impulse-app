import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import registerImage from '../images/51.jpg';

// RegisterPage component that displays a registration form
function RegisterPage() {
    const navigate = useNavigate();

    // State to store user registration information
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    // Function to handle user registration
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request for user registration
            const response = await axios.post('/user/register', { username, email, password });

            // If successful, navigate to the login/home page
            navigate('/');

            // Display a toast success notification
            toast.success('Registration successful! You can now log in.', {icon: '🤝'});
        } catch (error) {
            console.error(error);

            // If unsuccessful, display a toast error notification
            toast.error('Sorry, the provided email or username is already in use.', {icon: '🚫'});
        }
    }

    return (
        <div className="page-container">

            <div className="image-container">
                <img src={registerImage} />
            </div>

            <div className="form-container">
                <form onSubmit={handleRegister}>

                    <h2>Sign up to Impulse</h2>

                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="current-email"
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="6+ characters"
                        pattern=".{6,}"
                    />

                    <button type="submit">Register</button>
                    
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </form>
            </div>

        </div>
    );

}

export default RegisterPage;