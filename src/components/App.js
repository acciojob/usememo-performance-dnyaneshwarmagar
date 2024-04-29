import React, { useState, useMemo } from 'react';
import './../styles/App.css';

// Function to generate initial list of tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 0; i < 25; i++) {
    tasks.push({ id: i, title: `Todo ${i + 1}`, completed: false });
  }
  for (let i = 25; i < 50; i++) {
    tasks.push({ id: i, title: `Todo ${i + 1}`, completed: true });
  }
  return tasks;
};

// Task component
const Task = ({ task }) => {
  // Simulate complex rendering by artificially delaying the render
  const [rendered, setRendered] = useState(false);
  setTimeout(() => {
    setRendered(true);
  }, 100);

  return rendered ? <li>{task.title}</li> : null;
};

// App component
function App() {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Filter tasks based on the selected tab
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Todo App</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <div className="task-list">
        <ul>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
