import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../config';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/local`, credentials);
      const { jwt, user } = response.data;
      localStorage.setItem('jwt', jwt);
      return { user, token: jwt };
    } catch (error) {
      console.error('Login API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error?.message || error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/local/register`, userData);
      const { jwt, user } = response.data;
      localStorage.setItem('jwt', jwt);
      return { user, token: jwt };
    } catch (error) {
      console.error('Register API Error:', {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('jwt') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('jwt'),
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwt');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;