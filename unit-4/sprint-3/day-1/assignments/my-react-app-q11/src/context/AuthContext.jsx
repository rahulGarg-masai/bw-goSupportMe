import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: action.payload 
      };
    case 'SIGNUP_START':
      return { ...state, loading: true, error: null };
    case 'SIGNUP_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      };
    case 'SIGNUP_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false 
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: JSON.parse(user) 
      });
    }
  }, []);

  const login = (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      // For demo purposes, we'll use localStorage
      const demoUser = { 
        id: Date.now().toString(), 
        email: credentials.email, 
        name: credentials.email.split('@')[0] 
      };
      
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: demoUser 
      });
      
      return demoUser;
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.message 
      });
      throw error;
    }
  };

  const signup = (userData) => {
    dispatch({ type: 'SIGNUP_START' });
    
    try {
      // Validate data
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('All fields are required');
      }
      
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // For demo purposes, we'll use localStorage
      const newUser = { 
        id: Date.now().toString(), 
        email: userData.email, 
        name: userData.name 
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      
      dispatch({ 
        type: 'SIGNUP_SUCCESS', 
        payload: newUser 
      });
      
      return newUser;
    } catch (error) {
      dispatch({ 
        type: 'SIGNUP_FAILURE', 
        payload: error.message 
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
