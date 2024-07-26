const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure 'user' is required
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
