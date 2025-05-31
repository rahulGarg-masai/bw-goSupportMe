import { useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Badge,
  Alert,
  AlertIcon,
  SimpleGrid
} from '@chakra-ui/react';

const BookingsHistory = () => {
  const { bookings } = useSelector(state => state.booking);
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return (
      <Alert status="warning">
        <AlertIcon />
        Please sign in to view your booking history.
      </Alert>
    );
  }

  if (!bookings.length) {
    return (
      <Box my={8}>
        <Heading size="lg" mb={6}>Booking History</Heading>
        <Alert status="info">
          <AlertIcon />
          You haven't made any bookings yet.
        </Alert>
      </Box>
    );
  }

  return (
    <Box my={8}>
      <Heading size="lg" mb={6}>Booking History</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {bookings.map(booking => (
          <Box 
            key={booking.bookingId} 
            p={6} 
            borderWidth="1px" 
            borderRadius="lg" 
            boxShadow="md"
            bg="white"
          >
            <Stack spacing={3}>
              <Heading size="md">{booking.movieTitle}</Heading>
              
              <Box>
                <Badge colorScheme="green">Confirmed</Badge>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  Booking ID: {booking.bookingId}
                </Text>
              </Box>
              
              <Divider />
              
              <Stack direction="row" justify="space-between">
                <Text fontWeight="bold">Date:</Text>
                <Text>{booking.date}</Text>
              </Stack>
              
              <Stack direction="row" justify="space-between">
                <Text fontWeight="bold">Time:</Text>
                <Text>{booking.time}</Text>
              </Stack>
              
              <Stack direction="row" justify="space-between">
                <Text fontWeight="bold">Theater:</Text>
                <Text>{booking.theater}</Text>
              </Stack>
              
              <Stack direction="row" justify="space-between">
                <Text fontWeight="bold">Tickets:</Text>
                <Text>{booking.tickets}</Text>
              </Stack>
              
              <Divider />
              
              <Stack direction="row" justify="space-between">
                <Text fontWeight="bold">Total Amount:</Text>
                <Text fontSize="lg" fontWeight="bold">${booking.totalAmount}</Text>
              </Stack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BookingsHistory;
