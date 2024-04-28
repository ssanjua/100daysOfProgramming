import Task from "./Task";
import TaskForm from "./TaskForm";
import '../styles/TaskList.css'
import { useState } from 'react';

function TaskList() {

  const [tasks, setTasks] = useState([]);

  const addTask = task => {
    if(task.text.trim()) {
      task.text = task.text.trim();
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks)
    }
  }

  const deleteTask = id => {
    const taskUpdated = tasks.filter(task => task.id !== id);
    setTasks(taskUpdated);
  }

  const completeTask = id => {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <>
      <TaskForm onSubmit={addTask}/>
      
      <div className="task-list-container">
        {
          tasks.map((task) =>
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          )
        }
      </div>
    </>
  )
}

export default TaskList;