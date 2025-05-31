import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  matches: [],
  error: ''
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCHES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        matches: action.payload.data || [],
        totalPages: action.payload.total_pages || 1,
        error: ''
      };
    case FETCH_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        matches: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default matchReducer;
