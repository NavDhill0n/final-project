import React from 'react';
import RegisterCard from './RegisterCard'; // Adjust the path as needed
import './RegisterPage.css'; // Assuming you will use this CSS file for page styling
import Header from './Header';
import Footer from './Footer';


const RegisterPage = () => {
    const handleRegister = (email, password) => {
        console.log('Register attempted with:', email, password);
        // Implement registration logic here
    };

    return (
        <>
        <Header />
        <div className="register-page">
            <RegisterCard onRegister={handleRegister} />
        </div>
        <Footer />
        </>
    );
};

export default RegisterPage;
