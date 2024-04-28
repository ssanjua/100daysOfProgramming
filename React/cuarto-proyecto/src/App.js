import './App.css';
import TaskList from './components/TaskList';
import { FaTasks } from "react-icons/fa";
// Supports weights 400-700
import '@fontsource-variable/pixelify-sans';
import '@fontsource/patrick-hand';

function App() {
  return (
    <div className="todo-app">
      <div className="title">
        <h2>no one knows what to do, but write it down helps</h2>
      </div>
      <div className='todo-app-tasks'>
        <div className='display-text'>
          <h1 className='display'>
            <FaTasks style={{ marginRight: "8px", height:"1.2rem"}}/>
            My tasks
          </h1>
        </div>
        <TaskList />
      </div>
      <div className='credit'>
        <h3>made with ❤️ by ssanjua</h3>
      </div>
    </div>
  );
}

export default App;
