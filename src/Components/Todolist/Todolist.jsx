import React, { useState } from "react";
import "./Todolist.css";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [darkMode, setDarkMode] = useState(false); 
  const [editingTodoId, setEditingTodoId] = useState(null);
  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      setTodos([...todos, { id: todos.length + 1, text: todoText, completed: false }]);
      setTodoText("");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleTodoCompletion = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const handleToClick = (id) => {
    setEditingTodoId(id);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  return (
    <div className={`todolist ${darkMode ? 'dark-mode' : ''}`}>
      <div className="form_div">
        <div className="title_page">
          <h2>TODO</h2>
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} onClick={toggleDarkMode}></i>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todoText}
            onChange={handleChange}
            placeholder=" Create a new todo"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} onClick={() => handleToClick(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input type="checkbox" className="checkbox" checked={todo.completed} onChange={() => toggleTodoCompletion(todo.id)} />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
        <button onClick={clearCompletedTodos}>Clear Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
