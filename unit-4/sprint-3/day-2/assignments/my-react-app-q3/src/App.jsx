import { useState, useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleButtonClick = () => {
    inputRef.current.focus()
    inputRef.current.style.backgroundColor = '#f0f8ff'
    setIsFocused(true)
  }

  return (
    <div className="app">
      <h1>useRef Focus Example</h1>
      <div className="input-container">
        <input ref={inputRef} type="text" placeholder="Type something..." />
        <button onClick={handleButtonClick}>Focus Input</button>
      </div>
      {isFocused && <p className="focus-message">Focused!</p>}
    </div>
  )
}

export default App
