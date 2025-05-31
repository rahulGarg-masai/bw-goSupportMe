import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  Button,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { fetchPopularMovies } from '../../redux/actions/movieActions';
import MovieCard from './MovieCard';

const MovieList = () => {
  const dispatch = useDispatch();
  const { 
    popularMovies: { data, loading, error, page, totalPages },
    filter
  } = useSelector(state => state.movies);
  
  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, data.length, loading, error]);

  const handleLoadMore = () => {
    dispatch(fetchPopularMovies(page + 1));
  };

  const applyFilters = (movies) => {
    if (!movies) return [];
    
    return movies.filter(movie => {
      const yearMatch = !filter.year || (movie.release_date && movie.release_date.includes(filter.year));
      const genreMatch = !filter.genre || (movie.genre_ids && movie.genre_ids.includes(Number(filter.genre)));
      const ratingMatch = !filter.rating || (movie.vote_average >= Number(filter.rating));
      
      return yearMatch && genreMatch && ratingMatch;
    });
  };

  const filteredMovies = applyFilters(data);

  if (loading && !data.length) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (error && !data.length) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        {filteredMovies.length === data.length ? 'Popular Movies' : 'Filtered Results'}
      </Heading>

      {filteredMovies.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <AlertDescription>No movies found matching your filters.</AlertDescription>
        </Alert>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>

          {page < totalPages && (
            <Flex justify="center" mt={8}>
              <Button 
                onClick={handleLoadMore} 
                isLoading={loading}
                loadingText="Loading" 
                colorScheme="blue"
              >
                Load More
              </Button>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default MovieList;
