import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask, updateTask, editTask, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a title for the task.');
      return;
    }
    try {
      if (editTask) {
        const response = await axios.put(`http://localhost:3001/tasks/${editTask.id}`, {
          title,
          description,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        updateTask(response.data);
      } else {
        const response = await axios.post('http://localhost:3001/tasks', {
          title,
          description,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        addTask(response.data);
      }
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="text-gray-800 flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-gray-800 flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      ></textarea>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="flex-shrink-0 px-3 text-gray-800 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        type="submit"
        className="flex-shrink-0 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
