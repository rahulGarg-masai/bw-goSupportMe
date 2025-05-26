import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider, Box, Flex, Grid, Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'
import { ThemeContext } from './ThemeContext.jsx'

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Flex as="nav" p={4} bg={theme === 'light' ? 'gray.100' : 'gray.700'} justify="space-between">
        <Button onClick={toggleAuth}>{isLoggedIn ? 'Log Out' : 'Log In'}</Button>
        <Button onClick={toggleTheme}>Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme</Button>
      </Flex>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} p={4}>
        <Box p={4} shadow="md" bg={theme === 'light' ? 'gray.200' : 'gray.600'}>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </Box>
        <Box p={4} shadow="md" bg={theme === 'light' ? 'gray.200' : 'gray.600'}>
          Card 2
        </Box>
        <Box p={4} shadow="md" bg={theme === 'light' ? 'gray.200' : 'gray.600'}>
          Card 3
        </Box>
      </Grid>
      <Box as="footer" p={4} bg={theme === 'light' ? 'gray.300' : 'gray.800'}>
        Footer Content
      </Box>
    </ChakraProvider>
  )
}

export default App
