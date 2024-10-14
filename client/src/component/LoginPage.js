import React from 'react';
import LoginCard from './LoginCard'; // Adjust the path as needed
import './LoginPage.css'; // Assuming you will use this CSS file for page styling
import Header from './Header';
import Footer from './Footer';
const LoginPage = () => {
    const handleLogin = (email, password) => {
        console.log('Login attempted with:', email, password);
        // Implement login logic here
    };

    return (
        <>
        <Header/>
        <div className="login-page">
            <LoginCard onLogin={handleLogin} />
        </div>
        <Footer />
        </>
    );
};

export default LoginPage;
