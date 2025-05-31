import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Alert,
  AlertIcon,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { fetchWatchlist } from '../../redux/actions/watchlistActions';
import MovieCard from '../Movies/MovieCard';

const WatchlistView = () => {
  const dispatch = useDispatch();
  const { watchlist, loading, error } = useSelector(state => state.watchlist);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Alert status="warning">
        <AlertIcon />
        Please sign in to view and manage your watchlist.
      </Alert>
    );
  }

  if (loading) {
    return (
      <Flex justify="center" my={8}>
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>My Watchlist</Heading>
      
      {watchlist.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text>Your watchlist is empty. Add some movies to watch later!</Text>
        </Alert>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default WatchlistView;
