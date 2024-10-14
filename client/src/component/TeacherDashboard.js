import React from 'react';
import UserHeader from './UserHeader';
import Footer from './Footer';
import './TeacherDashboard.css'; // Add this CSS file for styling

const TeacherDashboard = () => {
    return (
        <div className="dashboard-container">
            <UserHeader />
            <div className="dashboard-content">
                <h1>Welcome to Teacher Dashboard</h1>
            </div>
            <Footer />
        </div>
    );
};

export default TeacherDashboard;
