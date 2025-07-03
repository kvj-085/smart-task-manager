import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAdd, onEdit, editingTask, isEditing, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (isEditing && editingTask) {
      setTitle(editingTask.title || '');
      setCategory(editingTask.category || 'Personal');
      setDueDate(editingTask.dueDate || '');
    } else {
      setTitle('');
      setCategory('Personal');
      setDueDate('');
    }
  }, [isEditing, editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const taskData = {
      title,
      category,
      dueDate,
      completed: isEditing && editingTask ? editingTask.completed : false,
      ...(isEditing && editingTask && editingTask.id ? { id: editingTask.id } : {}),
    };
    if (isEditing) {
      onEdit(taskData);
    } else {
      onAdd(taskData);
    }
    setTitle('');
    setCategory('Personal');
    setDueDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Personal</option>
        <option>Work</option>
        <option>Health</option>
        <option>Study</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      {isEditing && (
        <button type="button" onClick={onCancelEdit} style={{marginLeft: '8px'}}>Cancel</button>
      )}
    </form>
  );
};

export default TaskForm;
