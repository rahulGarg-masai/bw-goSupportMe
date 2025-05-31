import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react'
import './App.css'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'

function App() {
  return (
    <Box bg="gray.100" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" color="blue.600">Book Library App</Heading>
          </Box>
          
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={6}
          >
            <Box w={{ base: '100%', md: '40%' }}>
              <AddBookForm />
            </Box>
            
            <Box w={{ base: '100%', md: '60%' }}>
              <BookList />
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default App
