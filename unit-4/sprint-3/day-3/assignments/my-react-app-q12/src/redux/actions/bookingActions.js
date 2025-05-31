import * as types from './actionTypes';
import { tmdbApi } from '../../api/tmdbApi';

export const fetchScreenings = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_SCREENINGS_REQUEST });
    
    try {
      const mockScreenings = [
        {
          id: 1,
          movieId,
          theater: 'Cineplex Downtown',
          date: '2025-06-05',
          time: '14:00',
          price: 12.99,
          availableSeats: 45
        },
        {
          id: 2,
          movieId,
          theater: 'Cineplex Downtown',
          date: '2025-06-05',
          time: '18:30',
          price: 14.99,
          availableSeats: 30
        },
        {
          id: 3,
          movieId,
          theater: 'Movie Paradise',
          date: '2025-06-06',
          time: '16:15',
          price: 11.99,
          availableSeats: 60
        }
      ];
      
      dispatch({
        type: types.FETCH_SCREENINGS_SUCCESS,
        payload: mockScreenings
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_SCREENINGS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const bookTicket = (bookingDetails) => {
  return async (dispatch) => {
    dispatch({ type: types.BOOK_TICKET_REQUEST });
    
    try {
      const mockBookingResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            bookingId: `BOOKING-${Date.now()}`,
            ...bookingDetails,
            status: 'confirmed',
            timestamp: new Date().toISOString()
          });
        }, 1000);
      });
      
      dispatch({
        type: types.BOOK_TICKET_SUCCESS,
        payload: mockBookingResponse
      });
      
      return Promise.resolve(mockBookingResponse);
    } catch (error) {
      dispatch({
        type: types.BOOK_TICKET_FAILURE,
        payload: error.message
      });
      
      return Promise.reject(error);
    }
  };
};
