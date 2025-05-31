import { combineReducers } from 'redux';
import matchReducer from './matchReducer';
import filterReducer from './filterReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  matchData: matchReducer,
  filterData: filterReducer,
  favoriteData: favoritesReducer
});

export default rootReducer;
