import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
