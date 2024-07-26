const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('./models/Task');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Create a new user (registration)
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});
  

// Authenticate a user (login)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Create a new task (requires authentication)
// Route to create a new task
app.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const user = req.user; // user should be set by authMiddleware

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = new Task({
      title,
      description,
      status,
      user: user._id, // Add user ID to the task
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task (requires authentication)
app.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const user = req.user;
    const { title, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: user._id },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});


// Get all tasks (requires authentication)
app.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }); // only return tasks for the authenticated user
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Delete a task (requires authentication)
app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, user: user._id });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
