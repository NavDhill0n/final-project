import React from 'react';
import './StudentDashboard.css'; // Include the CSS file for styling
import Footer from './Footer';
import UserHeader from './UserHeader'; 

const StudentDashboard = () => {
    return (
        <div className="student-dashboard-container">
            <UserHeader />
            <div className="student-dashboard-content">
                <h1>Welcome to Student Dashboard</h1>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
