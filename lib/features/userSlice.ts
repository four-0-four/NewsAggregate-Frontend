import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface UserDetails {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

interface UserState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  userDetails: UserDetails | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  status: 'idle',
  error: null,
  userDetails: null,
  isAuthenticated: false,
};

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk<UserDetails, void, { rejectValue: string }>(
  'user/fetchUserDetails',
  async (_, thunkAPI) => {
    const token = Cookies.get('access_token');
    if (!token) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
      const response = await fetch('https://api.farabix.com/mainframe2/auth/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      return await response.json() as UserDetails;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Failed to fetch user details');
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk<UserDetails, { username: string; password: string }, { rejectValue: string }>(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const loginResponse = await fetch('https://api.farabix.com/mainframe2/auth/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(credentials),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      const data = await loginResponse.json();
      const token = data['access_token'];
      Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });

      // Fetch user details after successful login
      return await thunkAPI.dispatch(fetchUserDetails()).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk<UserDetails, { first_name: string; last_name: string; email: string; password: string; confirmPassword: string }, { rejectValue: string }>(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const registerResponse = await fetch('https://api.farabix.com/mainframe2/auth/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!registerResponse.ok) {
        throw new Error('Registration failed');
      }

      const data = await registerResponse.json();
      const token = data['access_token'];
      Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });

      // Fetch user details after successful registration
      return await thunkAPI.dispatch(fetchUserDetails()).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const refreshAccessToken = createAsyncThunk<string, void, { rejectValue: string }>(
  'user/refreshAccessToken',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://api.farabix.com/mainframe2/auth/refresh/', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      const newAccessToken = data['access_token'];
      Cookies.set('access_token', newAccessToken, { secure: true, sameSite: 'Strict' });

      return newAccessToken;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Token refresh failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.userDetails = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(fetchUserDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.userDetails = null;
      state.error = action.payload;
    })
    .addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.status = 'succeeded';
      state.userDetails = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.status = 'succeeded';
      state.userDetails = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  },
});

export const { setUserAuthentication } = userSlice.actions;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;

export default userSlice.reducer;
