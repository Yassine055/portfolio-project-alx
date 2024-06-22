import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tasks:', data);
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (newTask) {
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
            console.log('Added task:', data.task);
            setTasks([...tasks, data.task]);
            setNewTask('');
          } else {
            console.error('Error in response:', data);
          }
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    }
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    }).catch(error => console.error('Error deleting task:', error));
  };

  const updateTask = (id) => {
    const updatedTask = prompt("Enter the updated task:");
    if (updatedTask) {
      fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: updatedTask }),
      }).then(() => {
        setTasks(tasks.map(task => task.id === id ? { ...task, task: updatedTask } : task));
      }).catch(error => console.error('Error updating task:', error));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <div className="d-flex justify-content-center my-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter a task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={addTask}>Add Task</button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.task}
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => updateTask(task.id)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
