import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { NewsArticle } from './slice';

const BaseURL = "http://127.0.0.1:8080"
const ProductionBaseURL = "https://api.farabix.com/mainframe2"

export const fetchNewsArticles = createAsyncThunk<NewsArticle[], void, { rejectValue: string }>(
    'news/fetchNewsArticles',
    async (_, thunkAPI) => {
        const token = Cookies.get('access_token');

        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const response = await fetch(BaseURL + '/news/user/get', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news articles');
            }

            const articles = await response.json() as NewsArticle[];
            return articles;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch news articles');
        }
    }
);


export const fetchOneNewsArticle = createAsyncThunk<NewsArticle, string, { rejectValue: string }>(
    'news/fetchOneNewsArticle',
    async (newsID, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('news_id', newsID?.toString()); // Convert newsID to string if it's not undefined

            const url = new URL(BaseURL + '/news/getByID');
            url.search = searchParams.toString();

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news articles');
            }

            const article = await response.json() as NewsArticle;
            return article;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch news articles');
        }
    }
);

