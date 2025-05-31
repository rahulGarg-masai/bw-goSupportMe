import { SET_FILTER } from '../actions/actionTypes';

const initialState = {
  team: '',
  year: '',
  status: 'all'
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default filterReducer;
