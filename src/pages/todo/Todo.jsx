/* eslint-disable react/button-has-type */
// ❌ Bad code with multiple responsibilities
import React, { useState } from 'react';

export const TodoApp = () => {
  // Handling state ❌
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Handle input change ❌
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Handle todo logic ❌
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // ❌  It doesn't provide a clear separation of smaller reusable components.
  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            <button onClick={() => handleCompleteTodo(index)}>{todo.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
