import React from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />

      <div className="task-info">
        <h3>{task.title}</h3>
        <p>📂 {task.category}</p>
        {task.dueDate && (
          <p className={isOverdue ? 'overdue' : ''}>📅 Due: {task.dueDate}</p>
        )}
      </div>

      <button onClick={onDelete}>❌</button>
      <button onClick={onEdit} style={{marginLeft: '8px'}}>✏️ Edit</button>
    </div>
  );
};

export default TaskItem;
