import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react';
import { searchMovies, setFilter } from '../../redux/actions/movieActions';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  });

  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' }
  ];

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  
  const ratings = [
    { value: "9", label: "9+ ⭐" },
    { value: "8", label: "8+ ⭐" },
    { value: "7", label: "7+ ⭐" },
    { value: "6", label: "6+ ⭐" },
    { value: "5", label: "5+ ⭐" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchMovies(searchQuery));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    dispatch(setFilter(filters));
  }, [filters, dispatch]);

  const handleReset = () => {
    setSearchQuery('');
    setFilters({
      genre: '',
      year: '',
      rating: ''
    });
  };

  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="lg" 
      boxShadow="md"
      mb={6}
    >
      <form onSubmit={handleSearch}>
        <SimpleGrid columns={columns} spacing={4}>
          <FormControl>
            <FormLabel>Search Movies</FormLabel>
            <Input
              placeholder="Enter movie title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Genre</FormLabel>
            <Select
              placeholder="Select genre"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Year</FormLabel>
            <Select
              placeholder="Select year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Select
              placeholder="Minimum rating"
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              {ratings.map(rating => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>

        <Flex 
          mt={6} 
          justify="flex-end" 
          wrap="wrap"
          gap={3}
        >
          <Button 
            colorScheme="gray" 
            onClick={handleReset}
            size={buttonSize}
          >
            Reset
          </Button>
          <Button 
            colorScheme="blue" 
            type="submit"
            size={buttonSize}
          >
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SearchForm;
