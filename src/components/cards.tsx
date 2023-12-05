import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ITask } from '../types';


const Cards: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (newTask: ITask) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating a new task:', error);
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: ITask) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const createTaskForm = (
    <form onSubmit={(e) => {
      e.preventDefault();
      const newTask: ITask = {
          id: Date.now().toString(),
          taskName: 'Sample Task',
          taskDescription: 'This is a sample description',
          image: '',
          isComplete: false,
          description: '',
          name: undefined
      };
      handleCreateTask(newTask);
    }}>
      <input type="text" placeholder="Task name" /* onChange={handler} */ />
      <input type="text" placeholder="Description" /* onChange={handler} */ />
      {/* add other inputs here as needed */}
      <button type="submit">Create Task</button>
    </form>
  );
    

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>Task: {task.taskName}</p>
          <p>Description: {task.taskDescription}</p>
          {/* If task.image is a path or URL to an image, render an img tag */}
          {task.image && <img src={task.image} alt={task.taskName} />}
          <button onClick={() => handleUpdateTask(task.id, task)}>Update</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
      {createTaskForm}
    </div>
  );
};

    
export default Cards;
