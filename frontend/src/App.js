// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import AppComponent from './components/AppComponent';
import './App.css'; // Import the CSS file here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/app" element={<AppComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
