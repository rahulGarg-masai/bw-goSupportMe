import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import communitySlice from './communitySlice';
import feedSlice from './feedSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    community: communitySlice,
    feed: feedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});