import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Profile } from './components/Profile'
import { Settings } from './components/Settings'

function App() {
  return (
    <UserProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f5ff' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
