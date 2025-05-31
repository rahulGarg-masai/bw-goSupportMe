import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Divider,
  Badge,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { fetchMovieDetails } from '../../redux/actions/movieActions';
import { fetchScreenings, bookTicket } from '../../redux/actions/bookingActions';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { data: movie } = useSelector(state => state.movies.movieDetails);
  const { screenings, loadingScreenings, screeningsError, loadingBooking } = useSelector(state => state.booking);
  const { isAuthenticated } = useSelector(state => state.auth);

  const [selectedScreening, setSelectedScreening] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieDetails(id));
    }
    dispatch(fetchScreenings(id));
  }, [dispatch, id, movie]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login', { state: { from: `/booking/${id}` } });
    }
  }, [isAuthenticated, navigate, id, toast]);

  const handleScreeningSelect = (screeningId) => {
    const screening = screenings.find(s => s.id.toString() === screeningId);
    setSelectedScreening(screening);
  };

  const handleTicketChange = (value) => {
    setTickets(Number(value));
  };

  const handleSubmit = () => {
    if (!selectedScreening) {
      setFormError('Please select a screening time');
      return;
    }

    if (tickets < 1) {
      setFormError('Please select at least one ticket');
      return;
    }

    if (tickets > selectedScreening.availableSeats) {
      setFormError(`Only ${selectedScreening.availableSeats} seats available`);
      return;
    }

    setFormError('');

    const bookingDetails = {
      movieId: Number(id),
      movieTitle: movie?.title,
      screeningId: selectedScreening.id,
      theater: selectedScreening.theater,
      date: selectedScreening.date,
      time: selectedScreening.time,
      tickets,
      totalAmount: (selectedScreening.price * tickets).toFixed(2),
    };

    dispatch(bookTicket(bookingDetails))
      .then(response => {
        toast({
          title: "Booking Successful",
          description: `You've successfully booked ${tickets} ticket(s) for ${movie?.title}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/bookings');
      })
      .catch(error => {
        setFormError('An error occurred while processing your booking');
      });
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300x450?text=No+Image+Available';
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  if (loadingScreenings && !screenings.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Box>
    );
  }

  if (screeningsError && !screenings.length) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {screeningsError}
      </Alert>
    );
  }

  if (!movie) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        Loading movie details...
      </Alert>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto" py={8} px={4}>
      <Heading size="xl" mb={6}>Book Tickets</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <VStack spacing={4} align="start">
            <Image 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              height="300px"
              borderRadius="md"
              objectFit="cover"
            />
            
            <Heading size="lg">{movie.title}</Heading>
            
            <HStack wrap="wrap" spacing={3}>
              <Badge colorScheme="blue">{movie.release_date?.split('-')[0]}</Badge>
              {movie.runtime && (
                <Badge colorScheme="green">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Badge>
              )}
              {movie.genres?.slice(0, 3).map(genre => (
                <Badge key={genre.id} colorScheme="purple">
                  {genre.name}
                </Badge>
              ))}
            </HStack>
          </VStack>
        </Box>
        
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="md" mb={3}>Select Screening</Heading>
            {screenings.length === 0 ? (
              <Alert status="info">
                <AlertIcon />
                No screenings available for this movie.
              </Alert>
            ) : (
              <RadioGroup onChange={handleScreeningSelect} value={selectedScreening?.id.toString()}>
                <VStack spacing={3} align="stretch">
                  {screenings.map(screening => (
                    <Box 
                      key={screening.id} 
                      p={4} 
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={selectedScreening?.id === screening.id ? "blue.400" : "gray.200"}
                      _hover={{ borderColor: "blue.300", bg: "blue.50" }}
                    >
                      <Radio value={screening.id.toString()} colorScheme="blue" width="100%">
                        <HStack justify="space-between" width="100%">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">{screening.theater}</Text>
                            <Text fontSize="sm">{screening.date} at {screening.time}</Text>
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontWeight="bold">${screening.price}</Text>
                            <Text fontSize="sm">{screening.availableSeats} seats left</Text>
                          </VStack>
                        </HStack>
                      </Radio>
                    </Box>
                  ))}
                </VStack>
              </RadioGroup>
            )}
          </Box>
          
          <Divider />
          
          <FormControl>
            <FormLabel>Number of Tickets</FormLabel>
            <NumberInput 
              value={tickets} 
              min={1} 
              max={selectedScreening?.availableSeats || 10}
              onChange={handleTicketChange}
              isDisabled={!selectedScreening}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          
          {selectedScreening && (
            <Box p={4} bg="blue.50" borderRadius="md">
              <HStack justify="space-between">
                <Text>Price per ticket:</Text>
                <Text fontWeight="bold">${selectedScreening.price}</Text>
              </HStack>
              <HStack justify="space-between" mt={2}>
                <Text>Total:</Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${(selectedScreening.price * tickets).toFixed(2)}
                </Text>
              </HStack>
            </Box>
          )}
          
          {formError && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {formError}
            </Alert>
          )}
          
          <Button 
            colorScheme="blue" 
            size="lg" 
            onClick={handleSubmit}
            isLoading={loadingBooking}
            loadingText="Processing"
            isDisabled={!selectedScreening || screenings.length === 0}
          >
            Confirm Booking
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default BookingPage;
