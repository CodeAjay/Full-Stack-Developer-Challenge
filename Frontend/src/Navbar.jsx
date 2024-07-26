import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, handleLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Task Manager</Link>
        </div>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/tasks" className="hover:text-gray-400">Tasks</Link>
              <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
    