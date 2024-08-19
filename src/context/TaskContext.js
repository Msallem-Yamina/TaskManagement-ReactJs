import React, { createContext, useEffect, useState } from 'react';

const TaskContext = createContext();

 const getInitialState = () => {
  const tasks = localStorage.getItem('tasks')
  return tasks ? JSON.parse(tasks) : []
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getInitialState);

  // Set Tasks in LocalStorage 
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  // Remove Task
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Mark Task as Completed
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

// Update Task
 const updateTask = (id, updatedTask)=>{
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
  setTasks(updatedTasks);
 }

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, completeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
