import { useState } from 'react'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="App">
      <button onClick={toggleVisibility}>Toggle Message</button>
      {isVisible ? <p>Hello, World!</p> : null}
    </div>
  )
}

export default App
