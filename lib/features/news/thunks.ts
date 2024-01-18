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


export const fetchNewsByCategory = createAsyncThunk<NewsArticle[], { category_id: number, past_hours: number }, { rejectValue: string }>(
    'news/fetchNewsByCategory',
    async ({ category_id, past_hours }, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('category_id', category_id.toString());
            searchParams.append('past_hours', past_hours.toString());

            const url = new URL(BaseURL + '/news/getByCategory');
            url.search = searchParams.toString();

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news articles by category');
            }

            const articles = await response.json() as NewsArticle[];
            return articles;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch news articles by category');
        }
    }
);


export const fetchCategories = createAsyncThunk<string[], { parent_category_id: number }, { rejectValue: string }>(
    'news/fetchCategories',
    async ({ parent_category_id }, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('parent_category_id', parent_category_id.toString());

            const url = new URL(BaseURL + '/common/categories');
            url.search = searchParams.toString();

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categories = await response.json() as string[];
            return categories;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch categories');
        }
    }
);


export interface topicsPageNews {
    categories: string[];
    news: { [key: string]: NewsArticle[] };
}

export const fetchVarietyTopicsNews = createAsyncThunk<
    topicsPageNews,
    number,
    { rejectValue: string }
>(
    'news/getDifferentNewsForTopicPage',
    async (parent_category_id, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
        }

        try {
        const searchParams = new URLSearchParams();
        searchParams.append('parent_category_id', parent_category_id.toString());

        const url = new URL(BaseURL + '/news/getDifferentNewsForTopicPage');
        url.search = searchParams.toString();

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch news for different topics');
        }

        const data = await response.json();

        // Assuming the API response structure matches the topicsPageNews interface
        return data as topicsPageNews;
        } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to fetch news for different categories');
        }
    }
);


export const fetchTopicNews = createAsyncThunk<
    NewsArticle[],
    string,
    { rejectValue: string }
>(
    'news/getTopicNews',
    async (topic, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
        return thunkAPI.rejectWithValue('No access token available');
        }

        try {
        const searchParams = new URLSearchParams();
        searchParams.append('topic', topic);

        const url = new URL(BaseURL + '/news/getNewsbyTopic');
        url.search = searchParams.toString();

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch news for different topics');
        }

        const data = await response.json();

        // Assuming the API response structure matches the topicsPageNews interface
        return data as NewsArticle[];
        } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Failed to fetch news for different categories');
        }
    }
);