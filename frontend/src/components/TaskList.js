// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
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
          setTasks([...tasks, data]);
          setNewTask('');
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
        setIsEditing(false);
        setCurrentTask({});
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const toggleTaskCompletion = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}/complete`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => (task.id === id ? data : task)));
      })
      .catch(error => console.error('Error toggling task completion:', error));
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.task);
  };

  const handleEditChange = (e) => {
    setNewTask(e.target.value);
    setCurrentTask({ ...currentTask, task: e.target.value });
  };

  return (
    <div>
      <div className="input-group mb-3 task-input">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleEditChange}
        />
        {isEditing ? (
          <button className="btn btn-primary" onClick={() => updateTask(currentTask)}>Update Task</button>
        ) : (
          <button className="btn btn-primary" onClick={addTask}>Add Task</button>
        )}
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className={`list-group-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              {task.task}
              <ul>
                {task.subtasks && task.subtasks.map((subtask, index) => (
                  <li key={index}>{subtask}</li>
                ))}
              </ul>
            </div>
            <div>
              <button className="btn btn-success" onClick={() => toggleTaskCompletion(task.id)}>Complete</button>
              <button className="btn btn-edit" onClick={() => startEditing(task)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
