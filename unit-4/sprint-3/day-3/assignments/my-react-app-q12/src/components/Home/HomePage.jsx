import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Badge,
  Flex,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
// Using HTML/CSS alternatives instead of problematic Chakra UI icons
import { fetchPopularMovies } from '../../redux/actions/movieActions';
import SearchForm from '../Movies/SearchForm';
import MovieCard from '../Movies/MovieCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { 
    popularMovies,
    loading: moviesLoading
  } = useSelector(state => state.movies);
  
  useEffect(() => {
    if (popularMovies.length === 0) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, popularMovies.length]);

  // Featured movie is the highest rated movie from popular movies
  const featuredMovie = popularMovies.length > 0 
    ? [...popularMovies].sort((a, b) => b.vote_average - a.vote_average)[0]
    : null;

  // Get image URL helper
  const getImageUrl = (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  // Colors
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, gray.50)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      {/* Hero Section with Featured Movie */}
      {featuredMovie ? (
        <Box 
          bgImage={`linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${getImageUrl(featuredMovie.backdrop_path, 'original')})`}
          bgSize="cover"
          bgPosition="center"
          color="white"
          py={16}
          mb={10}
        >
          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
              <VStack spacing={6} align="flex-start">
                <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
                  Featured Movie
                </Badge>
                <Heading size="2xl" lineHeight="shorter">
                  {featuredMovie.title}
                </Heading>
                <HStack spacing={4}>
                  <Badge colorScheme="yellow" display="flex" alignItems="center">
                    <Box as="span" mr={1}>★</Box>
                    {featuredMovie.vote_average.toFixed(1)}
                  </Badge>
                  <Text>{featuredMovie.release_date?.split('-')[0]}</Text>
                </HStack>
                <Text fontSize="lg" noOfLines={3}>
                  {featuredMovie.overview}
                </Text>
                <Button 
                  as={RouterLink} 
                  to={`/movie/${featuredMovie.id}`}
                  size="lg" 
                  colorScheme="blue"
                  rightIcon={<Box as="span" ml={1}>→</Box>}
                >
                  View Details
                </Button>
              </VStack>
              
              <Box 
                display={{ base: 'none', md: 'block' }}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="2xl"
              >
                <Image 
                  src={getImageUrl(featuredMovie.poster_path)} 
                  alt={featuredMovie.title}
                  height="500px"
                  objectFit="cover"
                />
              </Box>
            </SimpleGrid>
          </Container>
        </Box>
      ) : (
        <Box py={16} bg={bgGradient}>
          <Container maxW="container.xl" textAlign="center">
            <Heading mb={6}>Welcome to MovieHub</Heading>
            <Text fontSize="xl" mb={6}>
              Find and book tickets for the latest movies
            </Text>
          </Container>
        </Box>
      )}

      {/* Search Section */}
      <Container maxW="container.xl" mb={10}>
        <Box mb={10}>
          <Heading size="lg" mb={6}>Find Movies</Heading>
          <SearchForm />
        </Box>

        {/* Popular Movies Section */}
        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Popular Movies</Heading>
            <Button 
              as={RouterLink} 
              to="/search" 
              variant="outline" 
              rightIcon={<ArrowForwardIcon />}
            >
              View All
            </Button>
          </Flex>

          {moviesLoading ? (
            <Flex justify="center" py={10}>
              <Spinner size="xl" thickness="4px" color="blue.500" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {popularMovies.slice(0, 8).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
