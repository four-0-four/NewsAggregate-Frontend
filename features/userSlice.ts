// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}


// Define the initial state using that type
const initialState: UserState = {
  status: 'idle',
  error: null,
};

//'https://api.farabix.com/mainframe2/auth/user/signup'
//'localhost:8000/auth/user/signup'
// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { first_name: string; last_name: string; email: string; password: string; confirmPassword: string }) => {
    const response = await fetch('https://api.farabix.com/mainframe2/auth/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  }
);

// Slice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error on new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null; // Clear error on success
        // Handle the action payload if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null; // Assign message or null if undefined
      });
  },
});

// Selectors for accessing the slice state
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;


export default userSlice.reducer;