import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/college logo.png" alt="Logo" />
      </div>
      
      {/* Center buttons */}
      <div className="center-buttons">
        <Link to="/" className="center-button">Home</Link>
        <button className="center-button">Annoucement</button>
        <button className="center-button">support</button>
        <button className="center-button">About Us</button>
      </div>
      
      <nav className="nav">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/register" className="nav-button register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
