import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() + Math.random() }]);
  };

  const startEditTask = (id) => {
    setEditingTaskId(id);
    const task = tasks.find(task => task.id === id);
    setEditingTask(task);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...updatedTask, id: editingTaskId } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.category === filter);
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="app-container">
      <h1>🧠 Smart Task Manager</h1>
      <TaskForm
        onAdd={addTask}
        onEdit={editTask}
        editingTask={editingTask}
        isEditing={editingTaskId !== null}
        onCancelEdit={cancelEdit}
      />
      <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            padding: '0.6rem 1.1rem',
            borderRadius: '0.7rem',
            border: '1px solid #c7d2fe',
            background: '#f1f5ff',
            fontSize: '1rem',
            color: '#4f46e5',
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="All">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Study">Study</option>
        </select>
      </div>
      <TaskList
        tasks={sortedTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        onEdit={startEditTask}
      />
    </div>
  );
};

export default App;
