import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate =useNavigate();

  useEffect(()=>{
    {localStorage.token?navigate("/tasks"):""}
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', { email, username, password });
      alert('Registration successful. Please log in.');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.error || 'Failed to register user');
      } else {
        setMsg('An unexpected error occurred');
      }
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="text-gray-800 flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        Register
      </button>
      {msg && <p className="text-red-500">{msg}</p>}
    </form>
    <p className="text-center py-5 text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-500">
                Log in
              </Link>
    </p>
  </>
  );
};

export default Signup;
