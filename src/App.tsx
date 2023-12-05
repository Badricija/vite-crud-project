import React, { ChangeEvent, useState, MouseEvent } from 'react';
import './App.css';
import { ITask } from './types';
import ToDoTask from './components/todoTask';
import axios from 'axios';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [todo, setTodo] = useState<ITask[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'task') {
      setTask(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };
  const addTaskToServer = async (newTask: ITask) => {
    try {
      const response = await axios.post(' http://localhost:3000/tasks', newTask);
      setTodo([...todo, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  const addTask = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newTask: ITask = {
      taskName: task,
      taskDescription: description,
      isComplete: false,
      id: Date.now().toString(),
      name: undefined,
      description: '',
      image: undefined
    };
    setTodo([...todo, newTask]);
    setTask('');
    setDescription('');
    addTaskToServer(newTask);
  };

  const completeTask = (taskNameToToggle: string): void => {
    setTodo((prevTodo) =>
      prevTodo
        .map((task) => (task.taskName === taskNameToToggle ? { ...task, isComplete: !task.isComplete } : task))
        .sort((a, b) => Number(a.isComplete) - Number(b.isComplete)),
    );
  };

  const deleteTask = (taskNameToDelete: string) => {
    setTodo(todo.filter((task) => task.taskName !== taskNameToDelete));
  };

  const editTask = (item: ITask): void => {
    setEditing(true);
    setTaskToEdit(item.taskName);
    setEditTaskName(item.taskName);
    setEditDescription(item.taskDescription);
  };

  const editTaskFunc = (taskNameToEdit: string, newTaskName: string, newDescription: string) => {
    setTodo(
      todo.map((task) =>
        task.taskName === taskNameToEdit
          ? { ...task, taskName: newTaskName, taskDescription: newDescription }
          : task
      )
    );
  };
  const saveEdit = () => {
    if (taskToEdit) {
      editTaskFunc(taskToEdit, editTaskName, editDescription);
    }
    setEditing(false);
    setTaskToEdit(null);
  };

  const cancelEdit = () => {
    setEditing(false);
    setTaskToEdit(null);
  };

  return (
    <>
      <h1 className="headline-task">This week's tasks</h1>
      <div className="js-task-wrapper task-wrapper">
          {todo.map((taskItem, index) => (
            <ToDoTask
              key={index}
              task={taskItem}
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={() => editTask(taskItem)}
              image={''}
              description={taskItem.taskDescription} saveTask={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          ))}
        </div>
        <div className="App">
        {editing ? (
          <div className="editContainer">
            {}
            <input
              type="text"
              placeholder="Task Name"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
            />
            {}
            <input
              type="text"
              placeholder="Task Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <button onClick={saveEdit}>Done</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <div className="inputContainer">
            <form className="js-task-form task--form">
              <input
                type="text"
                name="task"
                placeholder="Add a task"
                className="placeholder"
                value={task}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                className="placeholder"
                value={description}
                onChange={handleChange}
              />
              <br />
              <button type="submit" className="real-cool" onClick={addTask}>
                Add Task
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
