import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCommunities, getCommunity, createCommunity } from '../services/api';

export const fetchCommunities = createAsyncThunk(
  'community/fetchCommunities',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const communities = await getCommunities(filters);
      return communities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCommunity = createAsyncThunk(
  'community/fetchCommunity',
  async (communityId, { rejectWithValue }) => {
    try {
      const community = await getCommunity(communityId);
      return community;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewCommunity = createAsyncThunk(
  'community/createNewCommunity',
  async (communityData, { rejectWithValue }) => {
    try {
      const communityId = await createCommunity(communityData);
      return { id: communityId, ...communityData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  communities: [],
  currentCommunity: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    search: '',
    sortBy: 'recent',
  },
  recommendations: [],
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentCommunity: (state) => {
      state.currentCommunity = null;
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCommunity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCommunity = action.payload;
      })
      .addCase(fetchCommunity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewCommunity.fulfilled, (state, action) => {
        state.communities.unshift(action.payload);
      });
  },
});

export const { setFilters, clearCurrentCommunity, setRecommendations } = communitySlice.actions;
export default communitySlice.reducer;