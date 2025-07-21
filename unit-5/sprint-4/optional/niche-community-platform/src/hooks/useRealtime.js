import { useEffect, useState } from 'react';
import { subscribeToCollection } from '../services/api';

export const useRealtime = (collectionName, constraints = []) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToCollection(
      collectionName,
      (newData) => {
        setData(newData);
        setIsLoading(false);
      },
      constraints
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, isLoading, error };
};

export const useRealtimePosts = (communityId) => {
  const constraints = communityId 
    ? [['communityId', '==', communityId], ['orderBy', 'createdAt', 'desc']]
    : [];
    
  return useRealtime('posts', constraints);
};

export const useRealtimeComments = (postId) => {
  const constraints = postId 
    ? [['postId', '==', postId], ['orderBy', 'createdAt', 'asc']]
    : [];
    
  return useRealtime('comments', constraints);
};