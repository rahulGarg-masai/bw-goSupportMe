import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getPost, createPost, updatePost } from '../services/api';

export const fetchPosts = createAsyncThunk(
  'feed/fetchPosts',
  async ({ communityId, filters = {} }, { rejectWithValue }) => {
    try {
      const posts = await getPosts(communityId, filters);
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPost = createAsyncThunk(
  'feed/fetchPost',
  async (postId, { rejectWithValue }) => {
    try {
      const post = await getPost(postId);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewPost = createAsyncThunk(
  'feed/createNewPost',
  async (postData, { rejectWithValue }) => {
    try {
      const postId = await createPost(postData);
      return { id: postId, ...postData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const voteOnPost = createAsyncThunk(
  'feed/voteOnPost',
  async ({ postId, voteType, userId }, { rejectWithValue }) => {
    try {
      const post = await getPost(postId);
      const newVoteCount = voteType === 'up' ? post.votes + 1 : post.votes - 1;
      await updatePost(postId, { votes: newVoteCount });
      return { postId, votes: newVoteCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  feedSettings: {
    algorithm: 'chronological',
    showImages: true,
    autoRefresh: true,
  },
  draft: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedSettings: (state, action) => {
      state.feedSettings = { ...state.feedSettings, ...action.payload };
    },
    setDraft: (state, action) => {
      state.draft = action.payload;
    },
    clearDraft: (state) => {
      state.draft = null;
    },
    addReaction: (state, action) => {
      const { postId, reaction, userId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (!post.reactions) post.reactions = {};
        if (!post.reactions[reaction]) post.reactions[reaction] = [];
        
        const existingIndex = post.reactions[reaction].findIndex(r => r === userId);
        if (existingIndex === -1) {
          post.reactions[reaction].push(userId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(voteOnPost.fulfilled, (state, action) => {
        const { postId, votes } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.votes = votes;
        }
        if (state.currentPost && state.currentPost.id === postId) {
          state.currentPost.votes = votes;
        }
      });
  },
});

export const { setFeedSettings, setDraft, clearDraft, addReaction } = feedSlice.actions;
export default feedSlice.reducer;