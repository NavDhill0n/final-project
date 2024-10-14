import React from 'react';
import UserHeader from './UserHeader'; // Adjust the path based on your project structure
import Footer from './Footer';
import './AdminDashboard.css'; // Add custom CSS

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <UserHeader />
      <div className="admin-dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        {/* Add more admin-specific content here */}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
