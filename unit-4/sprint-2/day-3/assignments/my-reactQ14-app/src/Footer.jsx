import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext.jsx'

export default function Footer() {
  const { theme } = useContext(ThemeContext)
  return (
    <Box as="footer" bg={theme === 'light' ? 'gray.200' : 'gray.700'} p={4} textAlign="center">
      Footer Content
    </Box>
  )
}
