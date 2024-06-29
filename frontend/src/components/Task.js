// src/components/Task.js
import React, { useState } from 'react';

const Task = ({ task, updateTask, deleteTask }) => {
  const [miniTasks, setMiniTasks] = useState(task.miniTasks || []);
  const [newMiniTask, setNewMiniTask] = useState("");

  const handleAddMiniTask = () => {
    const updatedMiniTasks = [...miniTasks, newMiniTask];
    setMiniTasks(updatedMiniTasks);
    updateTask({ ...task, miniTasks: updatedMiniTasks });
    setNewMiniTask("");
  };

  const handleDeleteMiniTask = (index) => {
    const updatedMiniTasks = miniTasks.filter((_, i) => i !== index);
    setMiniTasks(updatedMiniTasks);
    updateTask({ ...task, miniTasks: updatedMiniTasks });
  };

  return (
    <div>
      <h3>{task.task}</h3>
      <ul>
        {miniTasks.map((miniTask, index) => (
          <li key={index}>
            {miniTask} <button onClick={() => handleDeleteMiniTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMiniTask}
        onChange={(e) => setNewMiniTask(e.target.value)}
      />
      <button onClick={handleAddMiniTask}>Add Mini Task</button>
      <button onClick={() => deleteTask(task.id)}>Delete Task</button>
    </div>
  );
};

export default Task;
