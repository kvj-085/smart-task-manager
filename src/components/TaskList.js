import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) return <p>No tasks yet 🚀</p>;

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onToggle={() => onToggle(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};

export default TaskList;
