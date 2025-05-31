import { SET_FILTER } from '../actions/actionTypes';

const initialState = {
  filter: 'ALL'
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
      
    default:
      return state;
  }
};

export default filterReducer;
