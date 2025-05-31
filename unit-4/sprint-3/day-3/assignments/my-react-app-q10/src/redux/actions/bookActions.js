import { ADD_BOOK, MARK_AS_READ, UPDATE_BOOK, DELETE_BOOK, SET_FILTER } from './actionTypes';

export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: {
    id: Date.now().toString(),
    ...book,
    isRead: false
  }
});

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  payload: { id }
});

export const updateBook = (id, updates) => ({
  type: UPDATE_BOOK,
  payload: {
    id,
    updates
  }
});

export const deleteBook = (id) => ({
  type: DELETE_BOOK,
  payload: { id }
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter }
});
