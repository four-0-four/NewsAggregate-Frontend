import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { NewsSourceState } from './slice';

const BaseURL = "http://127.0.0.1:8080"

const newsSourceChangerAPICaller = async (thunkAPI: { rejectWithValue: (arg0: string) => any; }, news_source_id: any, api:string) => {
    let token = Cookies.get('access_token');
    if (!token) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
        const searchParams = new URLSearchParams();
        searchParams.append('news_source_id', news_source_id.toString());

        const url = new URL(BaseURL + api);
        url.search = searchParams.toString();

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.detail || 'Failed to add news source preference');
      }

      return 'Success';
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
}

const newsSourceGetterAPICaller = async (thunkAPI: { rejectWithValue: (arg0: string) => any; }, api:string) => {
    let token = Cookies.get('access_token');
    if (!token) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
        const searchParams = new URLSearchParams();
        const url = new URL(BaseURL + api);
        url.search = searchParams.toString();

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.detail || 'Failed to add news source preference');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
}

export const getAllNewsSources = createAsyncThunk<
    NewsSourceState[],
    void,
    { rejectValue: string }
>(
  'newsSource/getall',
  async (_, thunkAPI) => {
    return await newsSourceGetterAPICaller(thunkAPI, '/newsSource/get-all');
  }
);


export const getAllUserNewsSourcesPreferences = createAsyncThunk<
    NewsSourceState[],
    void,
    { rejectValue: string }
>(
  'newsSource/get-users-preference',
  async (_, thunkAPI) => {
    return await newsSourceGetterAPICaller(thunkAPI, '/newsSource/get-users-preference');
  }
);


export const getAllUserNewsSourcesBlacklist = createAsyncThunk<
    NewsSourceState[],
    void,
    { rejectValue: string }
>(
  'newsSource/get-users-blacklist',
  async (_, thunkAPI) => {
    return await newsSourceGetterAPICaller(thunkAPI, '/newsSource/get-users-blacklist');
  }
);


export const addNewsSourcePreference = createAsyncThunk<
    NewsSourceState[],
  { news_source_id: number },
  { rejectValue: string }
>(
  'newsSource/addPreference',
  async ({ news_source_id }, thunkAPI) => {
    let response = await newsSourceChangerAPICaller(thunkAPI, news_source_id, '/preference/add_news_source_preference');
    if (response === 'Success') {
        return await thunkAPI.dispatch(getAllUserNewsSourcesPreferences()).unwrap();
    }
    return []
  }
);


export const removeNewsSourcePreference = createAsyncThunk<
    NewsSourceState[],
  { news_source_id: number },
  { rejectValue: string }
>(
  'newsSource/removePreference',
  async ({ news_source_id }, thunkAPI) => {
    let response = await newsSourceChangerAPICaller(thunkAPI, news_source_id, '/preference/delete_news_source_preference');
    if (response === 'Success') {
        return await thunkAPI.dispatch(getAllUserNewsSourcesPreferences()).unwrap();
    }
    return []
  }
);

export const addNewsSourceBlacklist = createAsyncThunk<
    NewsSourceState[],
  { news_source_id: number },
  { rejectValue: string }
>(
  'newsSource/addBlacklist',
  async ({ news_source_id }, thunkAPI) => {
    let response = await newsSourceChangerAPICaller(thunkAPI, news_source_id, '/preference/add_news_source_blacklist');
    if (response === 'Success') {
        return await thunkAPI.dispatch(getAllUserNewsSourcesBlacklist()).unwrap();
    }
    return []
  }
);


export const removeNewsSourceBlacklist = createAsyncThunk<
    NewsSourceState[],
  { news_source_id: number },
  { rejectValue: string }
>(
  'newsSource/removeBlacklist',
  async ({ news_source_id }, thunkAPI) => {
    let response = await newsSourceChangerAPICaller(thunkAPI, news_source_id, '/preference/delete_news_source_blacklist');
    if (response === 'Success') {
        return await thunkAPI.dispatch(getAllUserNewsSourcesBlacklist()).unwrap();
    }
    return []
  }
);