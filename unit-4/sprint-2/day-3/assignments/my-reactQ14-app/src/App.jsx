import { useState, useContext } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import MainContent from './MainContent.jsx'
import Footer from './Footer.jsx'
import './App.css'
import { AuthContext } from './AuthContext.jsx'
import { ThemeContext } from './ThemeContext.jsx'

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Flex>
      <Navbar />
      <Sidebar />
      <MainContent />
      <Footer />
    </Flex>
  )
}

export default App
