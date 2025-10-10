const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// ✅ Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// ➕ Add a new todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: "Error adding todo" });
  }
});

// ✏️ Update a todo (mark complete/incomplete)
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Error updating todo" });
  }
});

// ❌ Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
