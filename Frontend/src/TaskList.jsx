import React from 'react';
import TaskEditForm from './TaskEditForm';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, title, token, removeTask, updateTask, onEdit }) => {
  const handleEdit = (task) => {
    onEdit(task);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-black">{title}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2">
            <h4 className="text-lg font-semibold text-gray-600">{task.title}</h4>
            <p className="text-gray-600">{task.description}</p>
            <button
              onClick={() => handleEdit(task)}
              className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                removeTask(task._id);
              }}
              className="px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
