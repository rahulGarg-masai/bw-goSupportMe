import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Spinner,
  IconButton,
  Divider,
  Container
} from '@chakra-ui/react';
// Using HTML/CSS alternatives instead of problematic Chakra UI icons
import { fetchMovieDetails } from '../../redux/actions/movieActions';
import { fetchScreenings } from '../../redux/actions/bookingActions';
import { addToWatchlist, removeFromWatchlist } from '../../redux/actions/watchlistActions';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { data: movie, loading, error } = useSelector(state => state.movies.movieDetails);
  const { watchlist } = useSelector(state => state.watchlist);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const isInWatchlist = watchlist.some(item => item.id === Number(id));

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    if (isAuthenticated) {
      dispatch(fetchScreenings(id));
    }
  }, [dispatch, id, isAuthenticated]);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(Number(id)));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  const handleBookTickets = () => {
    navigate(`/booking/${id}`);
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.100" color="red.700" borderRadius="md" textAlign="center">
        Error: {error}
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box p={4} bg="yellow.100" color="yellow.700" borderRadius="md" textAlign="center">
        Movie details not found
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Button 
        leftIcon={<Box as="span" mr={1}>←</Box>} 
        onClick={() => navigate(-1)} 
        mb={6}
        variant="outline"
      >
        Back
      </Button>
      
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        bg="white" 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="xl"
      >
        <Box w={{ base: '100%', md: '40%' }} maxW={{ base: '100%', md: '400px' }}>
          <Image 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            w="100%"
            h={{ base: '400px', md: '600px' }}
            objectFit="cover"
          />
        </Box>
        
        <VStack 
          p={6} 
          align="start" 
          spacing={4} 
          w={{ base: '100%', md: '60%' }}
        >
          <Flex w="100%" justify="space-between" align="center">
            <Heading size="xl">{movie.title}</Heading>
            
            <Badge 
              colorScheme={movie.vote_average >= 7 ? "green" : movie.vote_average >= 5 ? "yellow" : "red"}
              fontSize="lg"
              px={3}
              py={1}
              borderRadius="md"
            >
              <Flex align="center">
                <Box as="span" mr={2}>★</Box>
                {movie.vote_average?.toFixed(1) || "N/A"}
              </Flex>
            </Badge>
          </Flex>
          
          {movie.tagline && (
            <Text fontSize="lg" fontStyle="italic" color="gray.600">
              "{movie.tagline}"
            </Text>
          )}
          
          <HStack spacing={6} wrap="wrap">
            <Flex align="center">
              <TimeIcon mr={2} />
              <Text>{movie.release_date?.split('-')[0] || 'N/A'}</Text>
            </Flex>
            
            {movie.runtime && (
              <Text>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Text>
            )}
            
            {movie.genres?.map(genre => (
              <Badge key={genre.id} colorScheme="blue" variant="subtle">
                {genre.name}
              </Badge>
            ))}
          </HStack>
          
          <Divider />
          
          <VStack align="start" spacing={3}>
            <Heading size="md">Overview</Heading>
            <Text>{movie.overview || 'No description available'}</Text>
          </VStack>
          
          {isAuthenticated && (
            <HStack spacing={4} pt={4}>
              <Button 
                leftIcon={isInWatchlist ? <CheckIcon /> : <AddIcon />}
                colorScheme={isInWatchlist ? "green" : "blue"}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              
              <Button 
                colorScheme="purple"
                onClick={handleBookTickets}
              >
                Book Tickets
              </Button>
            </HStack>
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default MovieDetail;
