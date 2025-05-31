import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/actions/bookActions';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Heading
} from '@chakra-ui/react';

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.title && book.author && book.genre) {
      dispatch(addBook(book));
      setBook({ title: '', author: '', genre: '' });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <Heading size="md" mb={4}>Add New Book</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter book title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Author</FormLabel>
            <Input
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Enter author name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Genre</FormLabel>
            <Select 
              name="genre" 
              value={book.genre} 
              onChange={handleChange}
              placeholder="Select genre"
            >
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science">Science</option>
              <option value="fantasy">Fantasy</option>
              <option value="biography">Biography</option>
              <option value="history">History</option>
              <option value="self-help">Self Help</option>
            </Select>
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full"
            isDisabled={!book.title || !book.author || !book.genre}
          >
            Add Book
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddBookForm;
