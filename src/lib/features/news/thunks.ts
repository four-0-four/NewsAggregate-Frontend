import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { NewsArticle } from './slice';
import { RootState } from '../../store';

let BaseURL: string | undefined;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  BaseURL = process.env.REACT_APP_LOCAL_URL;
} else if (process.env.NODE_ENV === 'production') {
  BaseURL = process.env.REACT_APP_PROD_URL;
} else if (process.env.NODE_ENV === 'staging') {
  BaseURL = process.env.REACT_APP_STAGE_URL;
}


export const healthCheck = createAsyncThunk<
    void, 
    void, 
    { state: RootState, rejectValue: string } 
>(
    'healthCheck',
    async (_, thunkAPI) => {

        try {
            const response = await fetch(BaseURL + '/health', {
                method: 'GET',
            });
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to do the health check');
        }
    }
);

export const fetchNewsArticles = createAsyncThunk<
    {articles: NewsArticle[], last_news_time: string, load_more: boolean}, 
    void, 
    { state: RootState, rejectValue: string } 
>(
    'news/fetchNewsArticles',
    async (_, thunkAPI) => {
        const token = Cookies.get('access_token');

        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        const state = thunkAPI.getState();
        const userArticles = state.news.articles
        
        try {
            const searchParams = new URLSearchParams();
            searchParams.append('last_news_time', (userArticles?.last_news_time ?? '').toString());
            searchParams.append('number_of_articles_to_fetch', (userArticles?.number_of_articles_to_fetch ?? '').toString())

            const url = new URL(BaseURL + '/news/user/get');
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

            const data = await response.json();
            return { articles: data.news as NewsArticle[], last_news_time: data.last_news_time, load_more: data.load_more };
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

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('news_id', newsID?.toString()); // Convert newsID to string if it's not undefined

            const url = new URL(BaseURL + '/news/getByID');
            url.search = searchParams.toString();
            const response = await fetch(url.toString(), {
                method: 'GET'
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


export const fetchOneNewsArticleAuthenticated = createAsyncThunk<NewsArticle, string, { rejectValue: string }>(
    'news/fetchOneNewsArticleAuthenticated',
    async (newsID, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('news_id', newsID?.toString()); // Convert newsID to string if it's not undefined

            const url = new URL(BaseURL + '/news/getByIDAuthenticated');
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


export const fetchTopicNews = createAsyncThunk<
    { articles: NewsArticle[]; topic: string; last_news_time:string; load_more: boolean},
    string,
    { state: RootState, rejectValue: string } 
>(
    'news/getTopicNews',
    async (topic, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        const state = thunkAPI.getState();
        const categoryArticles = state.news.categoryArticles;
        const category = categoryArticles.find(cat => cat.name === topic)

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('topic', topic);
            searchParams.append('last_news_time', (category?.last_news_time ?? '').toString());
            searchParams.append('number_of_articles_to_fetch', (category?.number_of_articles_to_fetch ?? '').toString());

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
            return { articles: data.news as NewsArticle[], last_news_time: data.last_news_time, topic: topic, load_more: data.load_more };
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch news for different categories');
        }
    }
);


export const addNewsToBookmark = createAsyncThunk<
    { message: string },
    number,
    { state: RootState, rejectValue: string }
>(
    'bookmarks/addNewsToBookmark',
    async (newsId, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('news_id', newsId.toString());

            const url = new URL(BaseURL + '/news/addNewsToBookmark');
            url.search = searchParams.toString();

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add news to bookmarks');
            }

            const data = await response.json();
            return { message: data.message };
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to add news to bookmarks');
        }
    }
);


export const removeNewsFromBookmark = createAsyncThunk<
    { message: string },
    number,
    { state: RootState, rejectValue: string }
>(
    'bookmarks/removeNewsFromBookmark',
    async (newsId, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const searchParams = new URLSearchParams();
            searchParams.append('news_id', newsId.toString());

            const url = new URL(BaseURL + '/news/removeNewsFromBookmark');
            url.search = searchParams.toString();

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove news from bookmarks');
            }

            const data = await response.json();
            return { message: data.message };
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to remove news from bookmarks');
        }
    }
);


export const getAllBookmarksForUser = createAsyncThunk<
    { bookmarks: any[] },
    void,
    { state: RootState, rejectValue: string }
>(
    'bookmarks/getAllBookmarksForUser',
    async (_, thunkAPI) => {
        const token = Cookies.get('access_token');
        if (!token) {
            return thunkAPI.rejectWithValue('No access token available');
        }

        try {
            const response = await fetch(`${BaseURL}/news/getAllBookmarksForUser/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bookmarks');
            }

            const data = await response.json();
            localStorage.setItem("bookmarks", JSON.stringify(data));
            return {bookmarks: data};
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Failed to fetch bookmarks');
        }
    }
);
