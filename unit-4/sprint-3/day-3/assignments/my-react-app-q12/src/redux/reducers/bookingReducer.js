import * as types from '../actions/actionTypes';

const initialState = {
  screenings: [],
  loadingScreenings: false,
  screeningsError: null,
  bookings: [],
  loadingBooking: false,
  bookingError: null,
  currentBooking: null
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCREENINGS_REQUEST:
      return {
        ...state,
        loadingScreenings: true,
        screeningsError: null
      };
    case types.FETCH_SCREENINGS_SUCCESS:
      return {
        ...state,
        screenings: action.payload,
        loadingScreenings: false,
        screeningsError: null
      };
    case types.FETCH_SCREENINGS_FAILURE:
      return {
        ...state,
        loadingScreenings: false,
        screeningsError: action.payload
      };
    case types.BOOK_TICKET_REQUEST:
      return {
        ...state,
        loadingBooking: true,
        bookingError: null
      };
    case types.BOOK_TICKET_SUCCESS:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        loadingBooking: false,
        bookingError: null,
        currentBooking: action.payload
      };
    case types.BOOK_TICKET_FAILURE:
      return {
        ...state,
        loadingBooking: false,
        bookingError: action.payload
      };
    default:
      return state;
  }
};

export default bookingReducer;
