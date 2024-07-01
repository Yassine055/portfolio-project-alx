import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import YourAppComponent from './components/AppComponent';
import './index.css'; // Include a global CSS reset if needed

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/app" element={<YourAppComponent />} />
    </Routes>
  </Router>,
  document.getElementById('welcome-root')
);
