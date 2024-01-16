import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { confirmRegistrationToken, fetchUserDetails, fetchUserFollowings, forgetPassword, loginUser, registerUser } from './thunks';

export interface UserDetails {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface UserState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  userDetails: UserDetails | null;
  followings?: string[];
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  status: 'idle',
  error: null,
  userDetails: null,
  isAuthenticated: false,
};

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
    setAuthenticationState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
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
    })
    .addCase(forgetPassword.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(forgetPassword.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(forgetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(confirmRegistrationToken.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(confirmRegistrationToken.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // handle any state updates needed after successful confirmation
    })
    .addCase(confirmRegistrationToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(fetchUserFollowings.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchUserFollowings.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.status = 'succeeded';
      state.followings = action.payload;
      state.error = null;
    })
    .addCase(fetchUserFollowings.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { setUserAuthentication, setAuthenticationState } = userSlice.actions;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectUserFollowings = (state: { user: UserState }) => state.user.followings;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;

export default userSlice.reducer;
