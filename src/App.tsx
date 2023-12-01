import { ChangeEvent, useState } from 'react';
import './index.css'
import { ITask } from './types';
import './App.css';
import ToDoTask from './components/todoTask';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    }
  };

  const addTask = () => {
    const newTask: ITask = {
      taskName: task,
      isComplete: false,
    };
    setTodo([...todo, newTask]);
    setTask('');
  };

  const completeTask = (taskNameToDelete: string) => {
    setTodo(todo.map((task) => {
      if (task.taskName === taskNameToDelete) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    }).sort((a, b) => Number(a.isComplete) - Number(b.isComplete)));
  };
  const deleteTask = (taskNameToDelete: string) => {
    setTodo(todo.filter((task) => task.taskName !== taskNameToDelete));
  };
  


  return (
    <><h1 className='list-header'> To Do List </h1><div className='App'>
      <div className='header'>
        <div className='inputContainer'>
          <input type='text' name='task' placeholder='Add a task' className='placeholder' value={task} onChange={handleChange}></input>
        </div>
        <button className='Add' onClick={addTask}>Add</button>
      </div>
      <div className='todoList'>
        {todo.map((task, index) => (
          <ToDoTask key={index} task={task} completeTask={completeTask} deleteTask={deleteTask}></ToDoTask>
        ))}
      </div>
    </div></>
  );
};

export default App;