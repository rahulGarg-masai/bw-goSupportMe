import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Flex,
  Spacer
} from '@chakra-ui/react'
import { addTodo, toggleTodo, deleteTodo } from './redux/actions'
import './App.css'

function TodoInput() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      dispatch(addTodo(title))
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input 
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="filled"
        />
        <Button type="submit" colorScheme="blue">Add Todo</Button>
      </HStack>
    </form>
  )
}

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  return (
    <ListItem p="2" borderWidth="1px" borderRadius="lg" mb="2">
      <Flex align="center">
        <Checkbox 
          isChecked={todo.status} 
          onChange={() => dispatch(toggleTodo(todo.id))}
          colorScheme="green"
          mr="2"
        />
        <Text 
          textDecoration={todo.status ? 'line-through' : 'none'}
          color={todo.status ? 'gray.500' : 'black'}
        >
          {todo.title}
        </Text>
        <Spacer />
        <IconButton 
          aria-label="Delete todo"
          icon={<Text fontSize="lg">🗑️</Text>}
          onClick={() => dispatch(deleteTodo(todo.id))}
          size="sm"
          colorScheme="red"
        />
      </Flex>
    </ListItem>
  )
}

function TodoList() {
  const todos = useSelector(state => state.todos)

  return (
    <List spacing={2} width="100%" mt="4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  )
}

function App() {
  return (
    <Container maxW="container.md" centerContent p="4">
      <Box p="8" width="100%" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" textAlign="center" color="blue.600">
          Todo Application
        </Heading>
        <Text textAlign="center" color="gray.500" mb="6">
          Manage your tasks efficiently with Redux
        </Text>
        <TodoInput />
        <VStack spacing="4" mt="8" align="stretch">
          <TodoList />
        </VStack>
      </Box>
    </Container>
  )
}

export default App
