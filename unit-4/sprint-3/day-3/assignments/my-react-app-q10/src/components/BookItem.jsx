import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Button, 
  HStack, 
  IconButton, 
  Flex, 
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure
} from '@chakra-ui/react';
import { markAsRead, updateBook, deleteBook } from '../redux/actions/bookActions';

const BookItem = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedBook, setEditedBook] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre
  });

  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    dispatch(markAsRead(book.id));
  };

  const handleDelete = () => {
    dispatch(deleteBook(book.id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = () => {
    dispatch(updateBook(book.id, editedBook));
    onClose();
  };

  return (
    <>
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        bg={book.isRead ? "gray.50" : "white"} 
        shadow="md"
        transition="all 0.3s"
        _hover={{ shadow: "lg" }}
      >
        <Flex align="center">
          <Box>
            <Heading size="md" mb={2}>
              {book.title}
              {book.isRead && (
                <Badge ml={2} colorScheme="green">
                  Read
                </Badge>
              )}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>
              By {book.author}
            </Text>
            <Badge colorScheme="blue" mb={3}>
              {book.genre}
            </Badge>
          </Box>
          <Spacer />
          <Box>
            <IconButton 
              aria-label="Delete book" 
              icon={<Text fontSize="lg">🗑️</Text>} 
              onClick={handleDelete} 
              colorScheme="red" 
              size="sm" 
              mr={2}
            />
            <IconButton 
              aria-label="Edit book" 
              icon={<Text fontSize="lg">✏️</Text>} 
              onClick={onOpen} 
              colorScheme="teal" 
              size="sm" 
            />
          </Box>
        </Flex>
        
        <HStack mt={4} spacing={4}>
          {!book.isRead && (
            <Button 
              size="sm" 
              colorScheme="green" 
              onClick={handleMarkAsRead}
            >
              Mark as Read
            </Button>
          )}
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input 
                name="title"
                value={editedBook.title}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Author</FormLabel>
              <Input 
                name="author"
                value={editedBook.author}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Genre</FormLabel>
              <Select 
                name="genre"
                value={editedBook.genre}
                onChange={handleEditChange}
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookItem;
