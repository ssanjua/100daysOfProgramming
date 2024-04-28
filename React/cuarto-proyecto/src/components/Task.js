import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import '../styles/Task.css'

function Task({ id, text, isCompleted, completeTask, deleteTask }) {
  return (
    <div className={isCompleted ? 'task-container completed' : 'task-container'}>
      <div
        onClick={() => completeTask(id)}
        className='task-text'>
        {text}
      </div>
      <div 
        onClick={() => deleteTask(id)}
        className='task-icon-container'>
        <AiOutlineCloseCircle className='task-icon' />
      </div>
    </div>
  )
}

export default Task;