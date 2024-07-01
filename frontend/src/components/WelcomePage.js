// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/app'); // Navigation vers l'application principale
  };

  return (
    <div className="welcome-page">
      <h1>Welcome To TaskEase</h1>
      <button onClick={handleButtonClick}>Get Started</button>
    </div>
  );
};

export default WelcomePage;
