import { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import CountrySearch from './components/Countries/CountrySearch'
import Navbar from './components/Layout/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user') !== null
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-container">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/countries" element={
                  <PrivateRoute>
                    <CountrySearch />
                  </PrivateRoute>
                } />
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
