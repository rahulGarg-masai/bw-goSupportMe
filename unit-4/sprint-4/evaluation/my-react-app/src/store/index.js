import { createStore, combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  pokemon: pokemonReducer
});

const store = createStore(rootReducer);

export default store;