import * as types from '../actions/actionTypes';

const initialState = {
  popularMovies: {
    data: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0
  },
  searchResults: {
    data: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    totalPages: 0
  },
  movieDetails: {
    data: null,
    loading: false,
    error: null
  },
  filter: {
    genre: '',
    year: '',
    rating: ''
  }
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_MOVIES_REQUEST:
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          loading: true,
          error: null
        }
      };
    case types.FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popularMovies: {
          data: action.payload.results,
          loading: false,
          error: null,
          page: action.payload.page,
          totalPages: action.payload.total_pages
        }
      };
    case types.FETCH_POPULAR_MOVIES_FAILURE:
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          loading: false,
          error: action.payload
        }
      };
    case types.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          loading: true,
          error: null
        }
      };
    case types.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        searchResults: {
          data: action.payload.results,
          loading: false,
          error: null,
          query: action.payload.query || state.searchResults.query,
          page: action.payload.page,
          totalPages: action.payload.total_pages
        }
      };
    case types.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          loading: false,
          error: action.payload
        }
      };
    case types.FETCH_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          loading: true,
          error: null
        }
      };
    case types.FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieDetails: {
          data: action.payload,
          loading: false,
          error: null
        }
      };
    case types.FETCH_MOVIE_DETAILS_FAILURE:
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          loading: false,
          error: action.payload
        }
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default movieReducer;
