import * as types from '../actions/actionTypes';

const initialState = {
  watchlist: [],
  loading: false,
  error: null
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_WATCHLIST_SUCCESS:
      return {
        ...state,
        watchlist: action.payload,
        loading: false,
        error: null
      };
    case types.FETCH_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_TO_WATCHLIST:
      const newWatchlist = [...state.watchlist, action.payload];
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return {
        ...state,
        watchlist: newWatchlist
      };
    case types.REMOVE_FROM_WATCHLIST:
      const filteredWatchlist = state.watchlist.filter(movie => movie.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist));
      return {
        ...state,
        watchlist: filteredWatchlist
      };
    default:
      return state;
  }
};

export default watchlistReducer;
