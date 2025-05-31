import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Flex,
  Heading,
  Text,
  Badge,
  IconButton,
  Tooltip,
  Link,
  HStack,
  VStack
} from '@chakra-ui/react';
// Using HTML/CSS alternatives instead of problematic Chakra UI icons
import { addToWatchlist, removeFromWatchlist } from '../../redux/actions/watchlistActions';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector(state => state.watchlist);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const isInWatchlist = watchlist.some(item => item.id === movie.id);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300x450?text=No+Image+Available';
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      transition="all 0.3s" 
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Box position="relative">
        <Image 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          height="300px"
          width="100%"
          objectFit="cover"
        />
        <Badge 
          position="absolute" 
          top="10px" 
          right="10px" 
          colorScheme={movie.vote_average >= 7 ? "green" : movie.vote_average >= 5 ? "yellow" : "red"}
          fontSize="0.9em"
          px={2}
          py={1}
          borderRadius="md"
        >
          <Flex align="center">
            <Box as="span" mr={1} fontSize="0.8em">★</Box>
            {movie.vote_average?.toFixed(1) || "N/A"}
          </Flex>
        </Badge>
        
        {isAuthenticated && (
          <Tooltip label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}>
            <IconButton
              aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              icon={isInWatchlist ? <Box as="span">✓</Box> : <Box as="span">+</Box>}
              position="absolute"
              bottom="10px"
              right="10px"
              colorScheme={isInWatchlist ? "green" : "blue"}
              size="sm"
              borderRadius="full"
              onClick={handleWatchlistToggle}
            />
          </Tooltip>
        )}
      </Box>

      <VStack p={4} spacing={2} align="stretch">
        <Link 
          as={RouterLink} 
          to={`/movie/${movie.id}`}
          _hover={{ textDecoration: 'none' }}
        >
          <Heading size="md" noOfLines={1}>{movie.title}</Heading>
        </Link>
        
        <HStack spacing={3} fontSize="sm">
          <Flex align="center">
            <Box as="span" mr={1}>⏲</Box>
            <Text>{movie.release_date?.split('-')[0] || 'N/A'}</Text>
          </Flex>
        </HStack>
        
        <Text fontSize="sm" noOfLines={3} color="gray.600">
          {movie.overview || 'No description available.'}
        </Text>
        
        <Link 
          as={RouterLink}
          to={`/movie/${movie.id}`}
          color="blue.500"
          fontSize="sm"
          fontWeight="medium"
          mt={2}
          _hover={{ textDecoration: 'none' }}
        >
          More Details
        </Link>
      </VStack>
    </Box>
  );
};

export default MovieCard;
