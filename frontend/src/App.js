// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import AppComponent from './components/AppComponent'; // Assurez-vous que c'est le bon composant

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/app" element={<AppComponent />} /> {/* Chemin vers l'application */}
      </Routes>
    </Router>
  );
}

export default App;
