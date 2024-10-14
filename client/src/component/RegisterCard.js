import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './RegisterCard.css'; // Ensure you have this CSS file for styling

const RegisterCard = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default role

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (onRegister) {
            onRegister(email, password, role);
        }
    };

    return (
        <div className="register-card-container">
            <div className="register-card">
                <div className="register-card-header">
                    <h2 className="register-card-title">Register</h2>
                </div>
                <form onSubmit={handleSubmit} className="register-card-body">
                    <label htmlFor="email" className="register-card-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-card-input"
                        required
                    />
                    <label htmlFor="password" className="register-card-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-card-input"
                        required
                    />
                    <label htmlFor="confirm-password" className="register-card-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="register-card-input"
                        required
                    />
                    <label htmlFor="role" className="register-card-label">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="register-card-select"
                        required
                    >
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" className="register-card-button">Register</button>
                </form>
            </div>
            <div className="register-card-lottie">
                <Player
                    src="/Animation.json" // Make sure the animation file is in the public folder
                    loop
                    autoplay
                    style={{ width: '300px', height: '300px' }} // Adjust size as needed
                />
            </div>
        </div>
    );
};

export default RegisterCard;
