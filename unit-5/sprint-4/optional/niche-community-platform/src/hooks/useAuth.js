import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setUser, setUserData } from '../store/authSlice';
import { getUser } from '../services/api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, userData, isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
        try {
          const userDoc = await getUser(user.uid);
          dispatch(setUserData(userDoc));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        dispatch(setUser(null));
        dispatch(setUserData(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    user,
    userData,
    isLoading,
    error,
    isAuthenticated,
  };
};