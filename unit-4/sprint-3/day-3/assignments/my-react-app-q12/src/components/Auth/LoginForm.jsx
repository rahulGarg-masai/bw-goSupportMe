import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  VStack, 
  Alert, 
  AlertIcon, 
  InputGroup, 
  InputRightElement 
} from '@chakra-ui/react';
import { login } from '../../redux/actions/authActions';

const LoginForm = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box p={6} borderRadius="md" boxShadow="lg" bg="white">
      <VStack spacing={4}>
        <Heading size="lg">Sign In</Heading>
        <Text fontSize="sm" color="gray.500">Access your movie watchlist and bookings</Text>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={loading}
              loadingText="Signing In"
            >
              Sign In
            </Button>
          </VStack>
        </form>
        
        <Text fontSize="sm">
          Don't have an account?{' '}
          <Button variant="link" color="blue.500" onClick={onSwitchToRegister}>
            Register
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginForm;
