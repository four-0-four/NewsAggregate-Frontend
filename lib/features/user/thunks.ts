import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { UserDetails } from './slice';

const BaseURL = "http://127.0.0.1:8080"
const ProductionBaseURL = "https://api.farabix.com/mainframe2"

export const confirmResetToken = createAsyncThunk<string, { token: string }, { rejectValue: string }>(
    'user/confirmResetToken',
    async ({ token }, thunkAPI) => {
      console.log("we are here")
      try {
        const response = await fetch(BaseURL + '/auth/user/confirm-reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to confirm reset token');
        }
  
        const message = await response.text(); // Assuming the response is a text message
        return message;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to confirm reset token');
      }
    }
  );


  export const confirmRegistrationToken = createAsyncThunk<string, { token: string }, { rejectValue: string }>(
    'user/confirmRegistrationToken',
    async ({ token }, thunkAPI) => {
      console.log("Attempting to confirm registration token");
      try {
        const response = await fetch(BaseURL + '/auth/user/confirm-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to confirm registration token');
        }
  
        const message = await response.text();
        return message;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to confirm registration token');
      }
    }
  );


  export const changePassword = createAsyncThunk<string, { token: string, newPassword: string, confirmPassword: string }, { rejectValue: string }>(
    'user/changePassword',
    async ({ token, newPassword, confirmPassword }, thunkAPI) => {
      try {
        const response = await fetch(BaseURL + '/auth/user/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, newPassword, confirmPassword }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to change password');
        }
  
        const data = await response.json();
  
        // Extract the new access token from the response
        const newAccessToken = data['access_token'];
        if (newAccessToken) {
          Cookies.set('access_token', newAccessToken, { secure: true, sameSite: 'Strict' });
        }
  
        // Return a message indicating success
        return 'Password changed successfully';
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to change password');
      }
    }
  );
  

export const forgetPassword = createAsyncThunk<string, { email: string }, { rejectValue: string }>(
    'user/forgetPassword',
    async ({ email }, thunkAPI) => {
      console.log("we are in forget password")
      try {
        const response = await fetch(BaseURL + '/auth/user/forget-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to initiate password reset');
        }
  
        const message = await response.text(); // Assuming the response is a text message
        return message;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to initiate password reset');
      }
    }
  );
  
  // Async thunk to fetch user details
  export const fetchUserDetails = createAsyncThunk<UserDetails, void, { rejectValue: string }>(
    'user/fetchUserDetails',
    async (_, thunkAPI) => {
      const token = Cookies.get('access_token');
      const cachedUserDetails = Cookies.get('user_details');
  
      if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
      }
  
      // Check if user details are cached and valid
      if (cachedUserDetails) {
        return JSON.parse(cachedUserDetails);
      }
  
      try {
        const response = await fetch(BaseURL + '/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
  
        const userDetails = await response.json() as UserDetails;
        // Store user details in cookies for caching
        Cookies.set('user_details', JSON.stringify(userDetails), { expires: 1 }); // expires in 1 day
        return userDetails;
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
        const loginResponse = await fetch(BaseURL + '/auth/user/login', {
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
        const registerResponse = await fetch(BaseURL + '/auth/user/signup', {
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
        const response = await fetch(BaseURL + '/auth/refresh/', {
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