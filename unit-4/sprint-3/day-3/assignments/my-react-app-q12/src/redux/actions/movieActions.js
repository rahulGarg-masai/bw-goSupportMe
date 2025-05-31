import * as types from './actionTypes';
import { tmdbApi } from '../../api/tmdbApi';

export const fetchPopularMovies = (page = 1) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_POPULAR_MOVIES_REQUEST });
    
    try {
      const response = await tmdbApi.getPopularMovies(page);
      dispatch({
        type: types.FETCH_POPULAR_MOVIES_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_POPULAR_MOVIES_FAILURE,
        payload: error.message
      });
    }
  };
};

export const searchMovies = (query, page = 1) => {
  return async (dispatch) => {
    dispatch({ type: types.SEARCH_MOVIES_REQUEST });
    
    try {
      const response = await tmdbApi.searchMovies(query, page);
      dispatch({
        type: types.SEARCH_MOVIES_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: types.SEARCH_MOVIES_FAILURE,
        payload: error.message
      });
    }
  };
};

export const fetchMovieDetails = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_MOVIE_DETAILS_REQUEST });
    
    try {
      const response = await tmdbApi.getMovieDetails(movieId);
      dispatch({
        type: types.FETCH_MOVIE_DETAILS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_MOVIE_DETAILS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter
});
