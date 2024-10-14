import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios'; // Import axios for making HTTP requests
import './LoginCard.css'; // Ensure you have this CSS file for styling

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default role
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hook for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message

        if (!email || !password || !role) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        console.log({ email, password, role });

        try {
            const normalizedRole = role.toLowerCase(); // Normalize the role for server
            const response = await axios.post('http://localhost:5000/login', {
                email: email.toLowerCase(), // Ensure email is lowercase
                password,
                role: normalizedRole,
            });

            const { token, role: userRole } = response.data;
            localStorage.setItem('token', token); // Store the JWT token in localStorage

            // Normalize the role comparison
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'teacher') {
                navigate('/teacher-dashboard');
            } else if (userRole === 'student') {
                navigate('/student-dashboard');
            } else {
                setErrorMessage('Unknown role');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Invalid email or password');
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="login-card-container">
            <div className="login-card-lottie">
                <Player
                    src="/login.json" // Make sure the animation file is in the public folder
                    loop
                    autoplay
                    style={{ width: '300px', height: '300px' }} // Adjust size as needed
                />
            </div>
            <div className="login-card">
                <div className="login-card-header">
                    <h2 className="login-card-title">Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="login-card-body">
                    <label htmlFor="email" className="login-card-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-card-input"
                        required
                    />
                    <label htmlFor="password" className="login-card-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-card-input"
                        required
                    />
                    <label htmlFor="role" className="login-card-label">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="login-card-select"
                        required
                    >
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" className="login-card-button">Login</button>

                    {/* Display error message */}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginCard;
