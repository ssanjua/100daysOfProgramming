import { useState } from "react";
import "../styles/TaskForm.css";
import { v4 as uuidv4 } from "uuid";
import { IoMdAddCircleOutline } from "react-icons/io";


function TaskForm(props) {

  const [input, setInput] = useState('');

  const handleInput = event => {
    setInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false,
    }
    props.onSubmit(newTask)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form">
      <input
        className="task-input"
        type="text"
        placeholder="write your task"
        name="text"
        onChange={handleInput}

      />
      <button className="task-button">
      <IoMdAddCircleOutline /> task
      </button>
    </form>
  )
}

export default TaskForm;