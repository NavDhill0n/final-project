import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';
import { Player } from '@lottiefiles/react-lottie-player'; // Import from lottie-react

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        {/* Lottie animation from the public folder */}
        <Player
            src="/Home_Animation.json" // Make sure the animation file is in the public folder
            loop
            autoplay
            style={{ width: '500px', height: '500px' }} // Adjust size as needed
        />
      
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
