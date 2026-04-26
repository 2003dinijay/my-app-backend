const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🚀 Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection error:', err));

// GET all todos — newest first
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST new todo
app.post('/api/todos', async (req, res) => {
  const { task, dueDate, dueTime } = req.body;
  const newTodo = new Todo({ task, dueDate: dueDate || null, dueTime: dueTime || null });
  await newTodo.save();
  res.json(newTodo);
});

// PATCH — toggle completed or update any field
app.patch('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

// DELETE
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));