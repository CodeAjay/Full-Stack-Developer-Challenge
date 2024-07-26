import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <header className="bg-indigo-600 w-full p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="mt-2 text-xl">Organize your tasks efficiently and effortlessly</p>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8">
        <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Task Manager</h2>
          <p className="text-gray-700 mb-4">
            Our Task Manager application helps you stay on top of your tasks with ease. Whether you're managing personal projects or team tasks, our platform provides you with all the tools you need to keep things organized.
          </p>
          <p className="text-gray-700 mb-4">
            With features such as task categorization, real-time updates, and user-specific task management, you'll never miss a deadline again. Experience a streamlined and efficient way to manage your tasks.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              to="/login"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-700">Create and manage tasks easily</li>
            <li className="text-gray-700">Organize tasks into different statuses</li>
            <li className="text-gray-700">Track progress and meet deadlines</li>
            <li className="text-gray-700">Secure and user-friendly interface</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 w-full p-4 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
