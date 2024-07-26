const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, user: req.user.userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get tasks' });
  }
});

module.exports = router;
