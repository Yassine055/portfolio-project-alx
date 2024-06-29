import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './components/WelcomePage';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/app" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
