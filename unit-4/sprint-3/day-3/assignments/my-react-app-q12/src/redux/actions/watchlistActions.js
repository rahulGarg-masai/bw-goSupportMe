import * as types from './actionTypes';

export const addToWatchlist = (movie) => ({
  type: types.ADD_TO_WATCHLIST,
  payload: movie
});

export const removeFromWatchlist = (movieId) => ({
  type: types.REMOVE_FROM_WATCHLIST,
  payload: movieId
});

export const fetchWatchlist = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_WATCHLIST_REQUEST });
    
    try {
      const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      
      dispatch({
        type: types.FETCH_WATCHLIST_SUCCESS,
        payload: watchlist
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_WATCHLIST_FAILURE,
        payload: error.message
      });
    }
  };
};
