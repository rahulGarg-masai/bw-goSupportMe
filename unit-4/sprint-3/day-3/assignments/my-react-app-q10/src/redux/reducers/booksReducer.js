import { ADD_BOOK, MARK_AS_READ, UPDATE_BOOK, DELETE_BOOK } from '../actions/actionTypes';

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
      
    case MARK_AS_READ:
      return state.map(book => 
        book.id === action.payload.id 
          ? { ...book, isRead: true } 
          : book
      );
      
    case UPDATE_BOOK:
      return state.map(book =>
        book.id === action.payload.id
          ? { ...book, ...action.payload.updates }
          : book
      );
      
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.payload.id);
      
    default:
      return state;
  }
};

export default booksReducer;
