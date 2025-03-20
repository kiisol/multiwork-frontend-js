import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Получение всех навыков
export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/skills?populate=*');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch skills');
    }
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Селектор для получения всех навыков
export const getAllSkills = (state) => state.skills;

export default skillsSlice.reducer;