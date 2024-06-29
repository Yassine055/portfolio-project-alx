import React, { useState, useEffect } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (newTask) => {
    fetch('http://127.0.0.1:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.task) {
          setTasks([...tasks, data.task]);
        }
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const updateTask = (updatedTask) => {
    fetch(`http://127.0.0.1:5000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      {/* Ajoutez votre logique pour afficher et gérer les tâches ici */}
    </div>
  );
};

export default TaskList;
