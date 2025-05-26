import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { WeatherDetail } from './components/WeatherDetail'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherDetail />} />
      </Routes>
    </div>
  )
}

export default App
