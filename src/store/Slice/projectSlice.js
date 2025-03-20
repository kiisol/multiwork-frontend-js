import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects?populate=*');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${id}?populate=*`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch project');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ projectData, coverImage, skills, token, userId }, { rejectWithValue }) => {
    try {
      // Создаём проект
      const projectResponse = await api.post(
        '/projects',
        {
          data: {
            ...projectData,
            skills: skills,
            user: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Загружаем обложку, если есть
      if (coverImage) {
        const formData = new FormData();
        formData.append('files', coverImage);
        formData.append('ref', 'api::project.project');
        formData.append('refId', projectResponse.data.data.id);
        formData.append('field', 'coverImage');

        await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      return projectResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to create project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to delete project');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    singleProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching projects';
      })

      // Fetch a single project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload.data || null;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching project';
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload.data);
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating project';
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error deleting project';
      });
  },
});

export const { clearError } = projectsSlice.actions;

// Селекторы

export const getAllProjects = (state) => state.projects.projects;
export const getProjectById = (state) => state.projects.singleProject;
export const selectError = (state) => state.projects.error;

export default projectsSlice.reducer;