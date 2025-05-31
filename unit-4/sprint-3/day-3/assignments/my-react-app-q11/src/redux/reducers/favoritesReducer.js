import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/actionTypes';

const initialState = {
  favorites: []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          match => !(match.team1 === action.payload.team1 && 
                   match.team2 === action.payload.team2 && 
                   match.year === action.payload.year)
        )
      };
    default:
      return state;
  }
};

export default favoritesReducer;
