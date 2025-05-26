import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './AuthContext.jsx'
import { ThemeContextProvider } from './ThemeContext.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </StrictMode>,
)
