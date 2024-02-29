import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { UserDetails, followingReturnI } from './slice';

let BaseURL: string | undefined;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  BaseURL = process.env.REACT_APP_LOCAL_URL;
} else if (process.env.NODE_ENV === 'production') {
  BaseURL = process.env.REACT_APP_PROD_URL;
} else if (process.env.NODE_ENV === 'staging') {
  BaseURL = process.env.REACT_APP_STAGE_URL;
}

console.log('env', process.env.NODE_ENV);
console.log('BaseURL', BaseURL);


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  (_, thunkAPI) => {
    try {
      // Delete the access token cookie
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');

    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);


export const confirmResetToken = createAsyncThunk<string, { token: string }, { rejectValue: string }>(
    'user/confirmResetToken',
    async ({ token }, thunkAPI) => {
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
      try {
        const response = await fetch(BaseURL + '/auth/user/confirm-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to confirm registration token");
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


  export const changePassword = createAsyncThunk<UserDetails, { token: string, newPassword: string, confirmPassword: string }, { rejectValue: string }>(
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

        const refreshtoken = data['refresh_token'];
        if (refreshtoken) {
          Cookies.set('refresh_token', refreshtoken, { secure: true, sameSite: 'Strict' });
        }
  
        // Return a message indicating success
        return await thunkAPI.dispatch(fetchUserDetails()).unwrap();
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
  
      if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
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
          const res = await loginResponse.json()
          throw new Error(res.detail);
        }
  
        const data = await loginResponse.json();
        const token = data['access_token'];
        Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });

        const refreshtoken = data['refresh_token'];
        Cookies.set('refresh_token', refreshtoken, { secure: true, sameSite: 'Strict' });
  
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
  export const registerUser = createAsyncThunk<string, { first_name: string; last_name: string; email: string; password: string; confirmPassword: string }, { rejectValue: string }>(
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
  
        // Fetch user details after successful registration
        return "Registration successful";
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
          headers: {
            'refresh-token': Cookies.get('refresh_token') || '',
          }
        });
  
        if (!response.ok) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          throw new Error('Token refresh failed');
        }
  
        const data = await response.json();
        const newAccessToken = data['access_token'];
        Cookies.set('access_token', newAccessToken, { secure: true, sameSite: 'Strict' });

        const refreshToken = data['refresh_token'];
        Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'Strict' });
  
        return newAccessToken;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Token refresh failed');
      }
    }
  );


  export const fetchUserFollowings = createAsyncThunk<string[], void, { rejectValue: string }>(
    'user/fetchUserFollowings',
    async (_, thunkAPI): Promise<string[]> => {
      const token = Cookies.get('access_token');
  
      if (!token) {
        return thunkAPI.rejectWithValue('No access token available') as unknown as Promise<string[]>;
      }
  
      try {
        const response = await fetch(BaseURL + '/user/get-followings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          return thunkAPI.rejectWithValue('Failed to fetch user followings') as unknown as Promise<string[]>;
        }
  
        const userFollowings: string[] = await response.json();
        return userFollowings;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message) as unknown as Promise<string[]>;
        }
        return thunkAPI.rejectWithValue('Failed to fetch user details') as unknown as Promise<string[]>;
      }
    }
  );

  export const contactUs = createAsyncThunk<string, { full_name:string, email:string, topic:string, message:string }, { rejectValue: string }>(
    'user/contactUs',
    async ({ full_name, email, topic, message }, thunkAPI) => {
      try {
        const response = await fetch(BaseURL + '/user/contactUs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ full_name, email, topic, message }),
        });
  
        if (!response.ok) {
          // Adjust this message to reflect the failure of sending a contact message
          throw new Error('Failed to send contact message');
        }
  
        const responseData = await response.json(); // Correctly parsing JSON response
        return responseData.message; // Assuming the response has a 'message' key
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        // Adjust this message as well
        return thunkAPI.rejectWithValue('Failed to send contact message');
      }
    }  
  );


  export const reportBug = createAsyncThunk<string, { full_name:string, email:string, bug:string, description:string, files:File[] }, { rejectValue: string }>(
    'user/reportBug',
    async ({ full_name, email, bug, description, files }, thunkAPI) => {
      try {
        const formData = new FormData();
        formData.append('full_name', full_name);
        formData.append('email', email);
        formData.append('bug', bug);
        formData.append('description', description);
        // Append file if present

        if(files.length > 0){
          files.forEach(file => {
            formData.append('files', file);
          });
        }else{
          formData.append('files', new File([], ''));
        }

        const response = await fetch(BaseURL + '/user/reportBug', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          // Adjust this message to reflect the failure of sending a contact message
          throw new Error('Failed to send contact message');
        }
  
        const responseData = await response.json(); // Correctly parsing JSON response
        return responseData.message; // Assuming the response has a 'message' key
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        // Adjust this message as well
        return thunkAPI.rejectWithValue('Failed to send contact message');
      }
    }  
  );


  export const requestFeature = createAsyncThunk<string, { full_name:string, email:string, feature:string, description:string, files:File[] }, { rejectValue: string }>(
    'user/requestFeature',
    async ({ full_name, email, feature, description, files }, thunkAPI) => {
      try {
        const formData = new FormData();
        formData.append('full_name', full_name);
        formData.append('email', email);
        formData.append('feature', feature);
        formData.append('description', description);
        // Append file if present

        if(files.length > 0){
          files.forEach(file => {
            formData.append('files', file);
          });
        }else{
          formData.append('files', new File([], ''));
        }

        const response = await fetch(BaseURL + '/user/requestFeature', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          // Adjust this message to reflect the failure of sending a contact message
          throw new Error('Failed to send contact message');
        }
  
        const responseData = await response.json(); // Correctly parsing JSON response
        return responseData.message; // Assuming the response has a 'message' key
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        // Adjust this message as well
        return thunkAPI.rejectWithValue('Failed to send contact message');
      }
    }  
  );


  export const addFollowing = createAsyncThunk<
  followingReturnI,
  { topic: string },
  { rejectValue: string }
>(
  'user/addFollowing',
  async ({ topic }, thunkAPI) => {
    const token = Cookies.get('access_token');
    if (!token) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('topic', topic);

      const url = new URL(BaseURL + '/user/add-following');
      url.search = searchParams.toString();

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add following');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Failed to add following');
    }
  }
);

export const removeFollowing = createAsyncThunk<
  followingReturnI,
  { topic: string },
  { rejectValue: string }
>(
  'user/removeFollowing',
  async ({ topic }, thunkAPI) => {
    const token = Cookies.get('access_token');
    if (!token) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('topic', topic);

      const url = new URL(BaseURL + '/user/remove-following');
      url.search = searchParams.toString();

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove following');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Failed to remove following');
    }
  }
);

export const checkUsername = createAsyncThunk<
    { exists: boolean }, 
    string,
    { rejectValue: string }
>(
    'user/check-username',
    async (username, thunkAPI) => {
          try {
            const response = await fetch(`${BaseURL}/user/profile/check-username?username=${encodeURIComponent(username)}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error('Failed to check username');
          }

          const data = await response.json();
          return data;
        } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to check username');
        }
    }
);


export const updateProfile = createAsyncThunk<
    UserDetails, 
    {first_name:string, last_name:string, username:string},
    { rejectValue: string }
>(
    'user/update-profile',
    async ({first_name, last_name, username}, thunkAPI) => {
          const token = Cookies.get('access_token');
          if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
          }
          
          try {
            const response = await fetch(`${BaseURL}/user/profile/update`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({first_name, last_name, username})
          });

          if (!response.ok) {
              throw new Error('Failed to update the profile');
          }

          const data = await response.json();
          return data;
        } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to update the profile');
        }
    }
);


export const changeProfilePassword = createAsyncThunk<
  number, 
  {old_password:string, new_password:string, confirm_password:string},
  { rejectValue: string }
>(
    'user/profile/change-password',
    async ({old_password, new_password, confirm_password}, thunkAPI) => {
          let token = Cookies.get('access_token');
          if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
          }
          
          try {
            const response = await fetch(`${BaseURL}/user/profile/change-password`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({old_password, new_password, confirm_password})
          });
          
          if (!response.ok) {
            return response.status
          }

          const data = await response.json();
          let atoken = data['access_token'];
          Cookies.set('access_token', atoken, { secure: true, sameSite: 'Strict' });

          const refreshtoken = data['refresh_token'];
          Cookies.set('refresh_token', refreshtoken, { secure: true, sameSite: 'Strict' });
          return 1;
        } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to change the password from profile');
        }
    }
);