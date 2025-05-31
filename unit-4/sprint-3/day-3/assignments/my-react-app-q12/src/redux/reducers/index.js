import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  watchlist: watchlistReducer,
  booking: bookingReducer
});

export default rootReducer;
