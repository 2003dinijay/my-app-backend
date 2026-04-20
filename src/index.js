const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo'); // Import the model
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🚀 Todo App Backend connected to Atlas'))
  .catch(err => console.error('❌ Connection error:', err));

// Change paths to include /api to match Frontend
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ task: req.body.task }); // Use 'task' to match frontend
  await newTodo.save();
  res.json(newTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});