import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskManager = ({ token, setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.get('http://localhost:3001/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [token, navigate]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    toast.success('Task added successfully!');
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    toast.success('Task updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const tasksToDo = tasks.filter(task => task.status === 'To Do');
  const tasksInProgress = tasks.filter(task => task.status === 'In Progress');
  const tasksDone = tasks.filter(task => task.status === 'Done');

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <ToastContainer />
      {!token ? (
        ''
      ) : (
        <>
          <TaskForm addTask={addTask} token={token} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskList
              tasks={tasksToDo}
              title="To Do"
              token={token}
              removeTask={removeTask}
              updateTask={updateTask}
              onEdit={setEditingTask}
            />
            <TaskList
              tasks={tasksInProgress}
              title="In Progress"
              token={token}
              removeTask={removeTask}
              updateTask={updateTask}
              onEdit={setEditingTask}
            />
            <TaskList
              tasks={tasksDone}
              title="Done"
              token={token}
              removeTask={removeTask}
              updateTask={updateTask}
              onEdit={setEditingTask}
            />
          </div>

          {editingTask && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <TaskEditForm
                  task={editingTask}
                  token={token}
                  onSave={(updatedTask) => {
                    updateTask(updatedTask);
                    setEditingTask(null);
                  }}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskManager;
