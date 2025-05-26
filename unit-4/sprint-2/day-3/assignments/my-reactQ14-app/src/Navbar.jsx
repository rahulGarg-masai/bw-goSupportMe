import { Flex, Button, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'
import { ThemeContext } from './ThemeContext.jsx'

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Flex as="nav" p={4} bg={theme === 'light' ? 'gray.100' : 'gray.700'} justify="space-between" align="center">
      <Text>{isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
      <Button onClick={toggleTheme}>Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme</Button>
    </Flex>
  )
}
