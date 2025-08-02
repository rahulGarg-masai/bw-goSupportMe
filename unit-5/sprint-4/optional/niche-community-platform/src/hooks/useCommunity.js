import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities, fetchCommunity } from '../store/communitySlice';

export const useCommunity = (communityId = null) => {
  const dispatch = useDispatch();
  const { 
    communities, 
    currentCommunity, 
    isLoading, 
    error, 
    filters,
    recommendations 
  } = useSelector((state) => state.community);

  useEffect(() => {
    if (communityId) {
      dispatch(fetchCommunity(communityId));
    }
  }, [dispatch, communityId]);

  const loadCommunities = (newFilters = {}) => {
    dispatch(fetchCommunities(newFilters));
  };

  const loadCommunity = (id) => {
    dispatch(fetchCommunity(id));
  };

  return {
    communities,
    currentCommunity,
    isLoading,
    error,
    filters,
    recommendations,
    loadCommunities,
    loadCommunity,
  };
};