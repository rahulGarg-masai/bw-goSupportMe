import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  Avatar,
  IconButton,
  useDisclosure,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
// Using regular HTML/CSS for icons instead of Chakra icons that are causing issues
import { logout } from '../../redux/actions/authActions';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <Box as="span" fontWeight="bold" fontSize="lg">
                  ✕
                </Box>
              ) : (
                <Box as="span" fontWeight="bold" fontSize="lg">
                  ☰
                </Box>
              )
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
          <Text
            as={RouterLink}
            to="/"
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily={'heading'}
            fontWeight="bold"
            fontSize="xl"
            color="blue.600"
          >
            MovieHub
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              <Link 
                as={RouterLink} 
                to="/" 
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'blue.50'
                }}
              >
                Home
              </Link>
              <Link 
                as={RouterLink} 
                to="/search" 
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'blue.50'
                }}
              >
                Search
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    as={RouterLink} 
                    to="/watchlist" 
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: 'blue.50'
                    }}
                  >
                    Watchlist
                  </Link>
                  <Link 
                    as={RouterLink} 
                    to="/bookings" 
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: 'blue.50'
                    }}
                  >
                    My Bookings
                  </Link>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>

        <HStack spacing={3}>
          {!isAuthenticated ? (
            <>
              <Button
                as={RouterLink}
                to="/login"
                fontSize={'sm'}
                fontWeight={400}
                variant={'outline'}
                colorScheme="blue"
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme="blue"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} name={user?.name} />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem as={RouterLink} to="/watchlist">My Watchlist</MenuItem>
                <MenuItem as={RouterLink} to="/bookings">My Bookings</MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        bg="white"
        p={4}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Stack as={'nav'} spacing={4}>
          <Link as={RouterLink} to="/" onClick={onToggle}>Home</Link>
          <Link as={RouterLink} to="/search" onClick={onToggle}>Search</Link>
          {isAuthenticated && (
            <>
              <Link as={RouterLink} to="/watchlist" onClick={onToggle}>Watchlist</Link>
              <Link as={RouterLink} to="/bookings" onClick={onToggle}>My Bookings</Link>
            </>
          )}
          {!isAuthenticated && (
            <Button
              as={RouterLink}
              to="/register"
              w="full"
              fontSize={'sm'}
              fontWeight={600}
              colorScheme="blue"
              display={{ md: 'none' }}
              onClick={onToggle}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
