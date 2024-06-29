// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/app');
  };

  return (
    <div className="welcome-page">
      <div className="welcome-text">
        <h1>Welcome to<br />TaskEase</h1>
      </div>
      <div className="welcome-button">
        <button onClick={handleStart} className="start-button">Start</button>
      </div>
    </div>
  );
};

export default WelcomePage;
