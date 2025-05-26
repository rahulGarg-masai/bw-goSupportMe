import { createContext, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const AuthContext = createContext()

function Navbar() {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext)
  return <nav><button onClick={toggleAuth}>{isAuthenticated ? 'Logout' : 'Login'}</button></nav>
}

function Main() {
  const { isAuthenticated } = useContext(AuthContext)
  return <main>{isAuthenticated ? 'You are logged in' : 'Please log in'}</main>
}

function Footer() {
  const { isAuthenticated } = useContext(AuthContext)
  return <footer>{isAuthenticated ? 'Welcome, User' : 'Please log in'}</footer>
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const toggleAuth = () => setIsAuthenticated(prev => !prev)

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      <Navbar />
      <Main />
      <Footer />
    </AuthContext.Provider>
  )
}

export default App
