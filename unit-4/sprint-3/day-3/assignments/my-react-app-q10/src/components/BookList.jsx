import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Heading,
  SimpleGrid,
  Select,
  Input,
  HStack,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react';
import BookItem from './BookItem';
import { setFilter } from '../redux/actions/bookActions';

const BookList = () => {
  const books = useSelector(state => state.books);
  const { filter } = useSelector(state => state.filterState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredBooks = books.filter(book => {
    // Apply reading status filter
    if (filter === 'READ' && !book.isRead) return false;
    if (filter === 'UNREAD' && book.isRead) return false;
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (searchBy === 'title') {
        return book.title.toLowerCase().includes(term);
      } else if (searchBy === 'author') {
        return book.author.toLowerCase().includes(term);
      } else if (searchBy === 'genre') {
        return book.genre.toLowerCase().includes(term);
      }
    }
    
    return true;
  });

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md" mt={6}>
      <VStack align="stretch" spacing={4}>
        <Heading size="md" mb={2}>Your Book Collection</Heading>
        
        <HStack spacing={4}>
          <Box flex="1">
            <Select 
              value={filter} 
              onChange={handleFilterChange}
              size="sm"
            >
              <option value="ALL">All Books</option>
              <option value="READ">Read</option>
              <option value="UNREAD">Unread</option>
            </Select>
          </Box>
          
          <Box flex="1">
            <Select 
              value={searchBy} 
              onChange={(e) => setSearchBy(e.target.value)}
              size="sm"
            >
              <option value="title">Search by Title</option>
              <option value="author">Search by Author</option>
              <option value="genre">Search by Genre</option>
            </Select>
          </Box>
          
          <Box flex="2">
            <Input 
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="sm"
            />
          </Box>
        </HStack>
        
        <Divider />
        
        {filteredBooks.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text color="gray.500">No books found. Add some books to your library!</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {filteredBooks.map(book => (
              <BookItem key={book.id} book={book} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default BookList;
