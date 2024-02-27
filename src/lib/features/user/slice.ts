import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addFollowing, changePassword, confirmRegistrationToken, contactUs, fetchUserDetails, fetchUserFollowings, forgetPassword, loginUser, logoutUser, refreshAccessToken, registerUser, removeFollowing, reportBug, requestFeature, updateProfile } from './thunks';


export interface followingReturnI {
  message: string;
  topic: string;
}

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
  followings: string[];
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  status: 'idle',
  error: null,
  userDetails: null,
  isAuthenticated: false,
  followings: []
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
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    addFollowingStatus: (state, action: PayloadAction<string>) => {
      if(state.followings.includes(action.payload)) return;
      state.followings.push(action.payload);
    },
    removeFollowingStatus: (state, action: PayloadAction<string>) => {
      if(!state.followings.includes(action.payload)) return;
      state.followings = state.followings.filter((following) => following !== action.payload);
    }
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
    .addCase(refreshAccessToken.rejected, (state, action) => {
      state.status = 'failed';
      state.userDetails = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.followings = [];
    })
    .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(updateProfile.rejected, (state, action) => {
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
    .addCase(changePassword.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(changePassword.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.status = 'succeeded';
      state.userDetails = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    })
    .addCase(changePassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.status = 'succeeded';
      state.userDetails = null;
      state.error = null;
      state.isAuthenticated = false;
      state.followings = [];
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
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
    })
    .addCase(contactUs.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(contactUs.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(contactUs.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(reportBug.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(reportBug.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(reportBug.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(requestFeature.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(requestFeature.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(requestFeature.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(addFollowing.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(addFollowing.fulfilled, (state, action: PayloadAction<followingReturnI>) => {
      state.status = 'succeeded';
      state.error = null;
      if(state.followings.includes(action.payload.topic)) return;
      state.followings.push(action.payload.topic);
    })
    .addCase(addFollowing.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(removeFollowing.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(removeFollowing.fulfilled, (state, action: PayloadAction<followingReturnI>) => {
      state.status = 'succeeded';
      state.error = null;
      if(!state.followings.includes(action.payload.topic)) return;
      state.followings = state.followings.filter((following) => following !== action.payload.topic);
    })
    .addCase(removeFollowing.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { setUserAuthentication, setAuthenticationState, resetStatus, addFollowingStatus, removeFollowingStatus } = userSlice.actions;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectUserDetails = (state: { user: UserState }) => state.user.userDetails;
export const selectUserFollowings = (state: { user: UserState }) => state.user.followings;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;

export default userSlice.reducer;
