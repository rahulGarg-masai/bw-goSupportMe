import axios from 'axios';

const API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

const createApiClient = () => {
  const client = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
    timeout: 10000,
  });
  
  return {
    getPopularMovies: (page = 1) => client.get('/movie/popular', { params: { page } }),
    searchMovies: (query, page = 1) => client.get('/search/movie', { params: { query, page } }),
    getMovieDetails: (id) => client.get(`/movie/${id}`),
    getMovieScreenings: (id) => client.get(`/movie/${id}/screenings`),
    getNowPlayingMovies: (page = 1) => client.get('/movie/now_playing', { params: { page } }),
    getTopRatedMovies: (page = 1) => client.get('/movie/top_rated', { params: { page } }),
    getMovieRecommendations: (id, page = 1) => client.get(`/movie/${id}/recommendations`, { params: { page } })
  };
};

export const tmdbApi = createApiClient();
