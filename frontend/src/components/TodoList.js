import React from 'react';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>No todos yet!</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 8,
            borderBottom: '1px solid #ccc',
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id, todo.completed)}
            style={{ marginRight: 8 }}
          />
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.task}
          </span>
          <button onClick={() => onDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
