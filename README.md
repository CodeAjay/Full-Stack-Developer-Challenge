# Task Management Application

A simple task management app using React and Express, with MongoDB for storage.

## Features

- User registration and authentication (JWT)
- Create, read, update, delete tasks
- Task categorization by status
- Toast notifications

## Prerequisites

- Node.js
- MongoDB
- npm

## Demo Video

https://www.loom.com/share/1d5e118842f841c284f41457bda60019?sid=7e17c70f-c135-4743-9570-ca605e54126f

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set environment variables in `backend/.env`:

   ```env
   PORT=3001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

3. Open `http://localhost:3000`.

## Backend Endpoints

- **POST /register**: Register user
- **POST /login**: Authenticate user
- **POST /tasks**: Create task
- **GET /tasks**: Get tasks
- **PUT /tasks/:id**: Update task
- **DELETE /tasks/:id**: Delete task

## Frontend Components

- **TaskManager**: Main component
- **TaskForm**: Add tasks
- **TaskList**: Display tasks
- **EditTaskForm**: Edit tasks

## Dependencies

### Backend

- Express
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

### Frontend

- React
- Axios
- React Toastify
- Tailwind CSS

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
```

This version provides the essential information while keeping it brief.
