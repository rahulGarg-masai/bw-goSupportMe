import { Grid, Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext.jsx'

export default function MainContent() {
  const { theme } = useContext(ThemeContext)
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F']
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} p={4} flex="1">
      {products.map((prod) => (
        <Box key={prod} p={4} bg={theme === 'light' ? 'gray.100' : 'gray.600'} shadow="md">
          {prod}
        </Box>
      ))}
    </Grid>
  )
}
