import React, { useState } from 'react';
import axios from 'axios';

const TaskEditForm = ({ task, token, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${task._id}`, {
        title,
        description,
        status,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSave(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
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
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-shrink-0 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default TaskEditForm;
