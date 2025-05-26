import { useState, createContext, useContext } from 'react'
import './App.css'

const ThemeContext = createContext()

function Box() {
  const { theme } = useContext(ThemeContext)
  return <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', padding: '1rem', marginTop: '2rem' }}>Box themed component</div>
}

function App() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ backgroundColor: theme === 'light' ? '#eee' : '#222', color: theme === 'light' ? '#000' : '#fff', minHeight: '100vh', padding: '2rem' }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Box />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
