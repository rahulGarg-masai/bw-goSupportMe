import axios from 'axios';
import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  SET_FILTER,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './actionTypes';

export const fetchMatchesRequest = () => ({
  type: FETCH_MATCHES_REQUEST
});

export const fetchMatchesSuccess = (matches) => ({
  type: FETCH_MATCHES_SUCCESS,
  payload: matches
});

export const fetchMatchesFailure = (error) => ({
  type: FETCH_MATCHES_FAILURE,
  payload: error
});

export const fetchMatches = () => {
  return async (dispatch) => {
    dispatch(fetchMatchesRequest());
    try {
      const response = await axios.get('https://jsonmock.hackerrank.com/api/football_matches?page=1');
      dispatch(fetchMatchesSuccess(response.data));
    } catch (error) {
      dispatch(fetchMatchesFailure(error.message));
    }
  };
};

export const setFilter = (filterParams) => ({
  type: SET_FILTER,
  payload: filterParams
});

export const addFavorite = (match) => ({
  type: ADD_FAVORITE,
  payload: match
});

export const removeFavorite = (match) => ({
  type: REMOVE_FAVORITE,
  payload: match
});
