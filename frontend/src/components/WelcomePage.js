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
      <h1>Welcome to<br />TaskEase</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default WelcomePage;
