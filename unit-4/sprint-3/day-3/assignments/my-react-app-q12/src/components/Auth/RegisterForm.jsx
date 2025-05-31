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
import { register } from '../../redux/actions/authActions';

const RegisterForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));
    } else {
      setFormErrors(errors);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box p={6} borderRadius="md" boxShadow="lg" bg="white">
      <VStack spacing={4}>
        <Heading size="lg">Create Account</Heading>
        <Text fontSize="sm" color="gray.500">Join to discover, track, and book movies</Text>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {formErrors.name && <Text color="red.500" fontSize="sm">{formErrors.name}</Text>}
            </FormControl>
            
            <FormControl isRequired isInvalid={!!formErrors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {formErrors.email && <Text color="red.500" fontSize="sm">{formErrors.email}</Text>}
            </FormControl>
            
            <FormControl isRequired isInvalid={!!formErrors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formErrors.password && <Text color="red.500" fontSize="sm">{formErrors.password}</Text>}
            </FormControl>
            
            <FormControl isRequired isInvalid={!!formErrors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && <Text color="red.500" fontSize="sm">{formErrors.confirmPassword}</Text>}
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={loading}
              loadingText="Creating Account"
              mt={2}
            >
              Register
            </Button>
          </VStack>
        </form>
        
        <Text fontSize="sm">
          Already have an account?{' '}
          <Button variant="link" color="blue.500" onClick={onSwitchToLogin}>
            Sign In
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default RegisterForm;
