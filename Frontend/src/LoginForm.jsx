import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    {localStorage.token?navigate("/tasks"):""}
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      setToken(response.data.token);
      setMsg(response.data.message);
      navigate("/tasks")
    } catch (error) {
      setMsg(error.response?.data?.error || 'Failed to log in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col items-center bg-white shadow-md rounded-lg p-4 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-gray-800 flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-gray-800 flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="flex-shrink-0 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Login
        </button>
        {msg && <p className="text-red-500">{msg}</p>}
      </form>
      <p className="text-center py-5 text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-500">
                Register
              </Link>
    </p>
    </div>

  );
};

export default LoginForm;
