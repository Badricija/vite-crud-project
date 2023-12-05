// here upgrade tasks, so that we know that there is picture and new button -edit 
import React from 'react';
import { ITask } from '../types';

interface Props {
  task: ITask;
  description: string;
  completeTask(taskNameToDelete: string): void;
  deleteTask(taskNameToDelete: string): void;
  image: string;
  editTask(taskIdToEdit: string, newTaskName: string, newDescription: string): void;
  saveTask(task:ITask):void;
}



const ToDoTask: React.FC<Props> = ({ task, description, completeTask, deleteTask, editTask}) => {
  return (
    <div className="task" style={{ opacity: task.isComplete ? 0.3: 1 }}>
      <div className="content" style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
        <span>{task.taskName}</span>
        <br></br>
        <span>{description}</span>
      </div>
      <button onClick={() => completeTask(task.taskName)}>✔</button>
      <button onClick={() => deleteTask(task.taskName)}>✘</button>
      <button onClick={() => editTask(task.id, task.taskName, description)}>✎</button>
    </div>
  );
};
export default ToDoTask;
