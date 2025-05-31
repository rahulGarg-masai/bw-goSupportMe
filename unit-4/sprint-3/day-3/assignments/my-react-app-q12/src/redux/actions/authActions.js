import * as types from './actionTypes';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });
    
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (credentials.email === 'user@example.com' && credentials.password === 'password') {
            resolve({ 
              user: { 
                id: 1, 
                name: 'User', 
                email: credentials.email 
              }, 
              token: 'mock-jwt-token' 
            });
          } else {
            throw new Error('Invalid credentials');
          }
        }, 800);
      });
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response.user
      });
      
      return Promise.resolve(response.user);
    } catch (error) {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: error.message
      });
      return Promise.reject(error);
    }
  };
};

export const register = (userInfo) => {
  return async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST });
    
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            user: { 
              id: Date.now(), 
              name: userInfo.name, 
              email: userInfo.email 
            }, 
            token: 'mock-jwt-token' 
          });
        }, 800);
      });
      
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: response.user
      });
      
      return Promise.resolve(response.user);
    } catch (error) {
      dispatch({
        type: types.REGISTER_FAILURE,
        payload: error.message
      });
      return Promise.reject(error);
    }
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  return {
    type: types.LOGOUT
  };
};
