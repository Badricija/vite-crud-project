import React from 'react';
import { ITask } from '../types';

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  deleteTask(taskNameToDelete: string): void;
  
}

const ToDoTask: React.FC<Props> = ({ task, completeTask, deleteTask }) => {
  return (
    <div className="task" style={{ opacity: task.isComplete ? 0.3: 1 }}>
      <div className="content" style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
        <span>{task.taskName}</span>
      </div>
      <button onClick={() => completeTask(task.taskName)}>✔</button>
      <button onClick={() => deleteTask(task.taskName)}>✘</button>
    </div>
  );
};
export default ToDoTask;
