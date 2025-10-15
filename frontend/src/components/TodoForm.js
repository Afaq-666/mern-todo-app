import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        style={{ padding: 8, width: '75%' }}
      />
      <button style={{ padding: 8, marginLeft: 6 }}>Add</button>
    </form>
  );
}
