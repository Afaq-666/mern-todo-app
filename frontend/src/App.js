import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  const fetchTodos = async () => {
    const res = await axios.get('/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (text) => {
    const res = await axios.post('/api/todos', { task: text });
    setTodos([res.data, ...todos]);
  };

  // Toggle completed
  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`/api/todos/${id}`, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>✅To-Do List(Add your daily tasks)</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
