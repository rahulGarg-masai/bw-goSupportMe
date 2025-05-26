import { Box, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'
import { ThemeContext } from './ThemeContext.jsx'

export default function Sidebar() {
  const { isLoggedIn } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  return (
    <Box display={{ base: 'none', md: 'block' }} w="200px" p={4} bg={theme === 'light' ? 'gray.200' : 'gray.700'}>
      {isLoggedIn && <Text>Welcome, User</Text>}
    </Box>
  )
}
