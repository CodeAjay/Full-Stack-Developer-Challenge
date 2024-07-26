import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TaskManager from './TaskManager';
import LoginForm from './LoginForm';
import Signup from './Signup';
import Navbar from './Navbar';
import "./App.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };
  const handleLogout = () => {
    handleSetToken(null);
  };

  return (
    <div className='app w-[100%]'>
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar token={token} handleLogout={handleLogout} />
        <div className="flex-grow flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm setToken={handleSetToken} />} />
            <Route path="/signup" element={<Signup setToken={handleSetToken} />} />
            <Route path="/tasks" element={<TaskManager token={token} setToken={handleSetToken} />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
