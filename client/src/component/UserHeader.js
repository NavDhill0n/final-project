import React from 'react';
import { Link } from 'react-router-dom';
import './UserHeader.css';

const UserHeader = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/college logo.png" alt="Logo" />
      </div>
      
      {/* Center buttons */}
      <div className="center-buttons">
        <Link to="/" className="center-button">Home</Link>
        <button className="center-button">Announcement</button>
        <button className="center-button">Support</button>
        <button className="center-button">About Us</button>
      </div>
      
      <nav className="nav">
        <Link to="/profile" className="nav-button">Profile</Link>
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/" className="nav-button logout">Logout</Link>
      </nav>
    </header>
  );
};

export default UserHeader;
