import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, toggleTask } from './store/taskSlice'
import './App.css'

function App() {
  const [taskText, setTaskText] = useState('')
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText))
      setTaskText('')
    }
  }

  return (
    <div className="app">
      <h1>Task List</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => dispatch(toggleTask(task.id))}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
