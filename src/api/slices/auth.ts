import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import { isAxiosError } from 'axios';
import type { ApiResponse, ApiErrorResponse } from '@/types/api';
import { authService } from '@api/services/authService';
import type { RegisterPayload } from '@/types/auth';

interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  hydrating: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  hydrating: true,
};

export const register = createAsyncThunk<
  ApiResponse<UserType>,
  RegisterPayload,
  { rejectValue: ApiErrorResponse }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const login = createAsyncThunk<
  ApiResponse<UserType>,
  { email: string; password: string },
  { rejectValue: ApiErrorResponse }
>(
  'auth/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(userData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiErrorResponse }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const fetchMe = createAsyncThunk<
  ApiResponse<UserType>,
  void,
  { rejectValue: ApiErrorResponse }
>('auth/me', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.fetchMe();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // register
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Registration failed';
      })

      // login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Login failed';
      })

      // logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload?.message ?? 'Logout failed';
      })

      // fetchMe runs on app startup to restore user from cookie
      .addCase(fetchMe.pending, state => {
        state.hydrating = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.hydrating = false;
        state.user = action.payload.data;
      })
      .addCase(fetchMe.rejected, state => {
        state.hydrating = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
