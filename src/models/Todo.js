const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task:      { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate:   { type: Date, default: null },
  dueTime:   { type: String, default: null }, // "HH:MM" 24-hour format
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);