// src/components/AppComponent.js
import React from 'react';
import './App.css';
import TaskList from './TaskList';

const AppComponent = () => {
  return (
    <div className="main-container">
      <div className="task-section">
        <h1>TaskEase</h1>
        <TaskList />
      </div>
    </div>
  );
};

export default AppComponent;
