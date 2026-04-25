import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import instance from '@api/axiosInstance';
import { isAxiosError } from 'axios';
import type { ApiResponse } from '@/types/api';

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

type RegisterPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export const register = createAsyncThunk<
  ApiResponse<UserType>,
  RegisterPayload,
  { rejectValue: { message: string } }
>('auth/register', async (userData: RegisterPayload, { rejectWithValue }) => {
  try {
    const response = await instance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
  }
});

export const login = createAsyncThunk<
  ApiResponse<UserType>,
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await instance.post('/auth/logout');
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
  }
});

export const fetchMe = createAsyncThunk<
  ApiResponse<UserType>,
  void,
  { rejectValue: { message: string } }
>('auth/me', async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get('/users/current-user');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
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
