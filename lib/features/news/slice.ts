import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchNewsArticles, fetchNewsByCategory, fetchOneNewsArticle, fetchTopicNews, fetchVarietyTopicsNews, topicsPageNews } from './thunks';

export interface NewsArticle {
    id: number;
    title: string;
    description: string;
    content: string;
    publishedDate: string; // Or Date, if you prefer
    language_id: number;
    isInternal: boolean;
    isPublished: boolean;
    createdAt: string; // Or Date
    updatedAt: string; // Or Date
    categories: string[];
    keywords: string[];
    media: string[];
    from: string;
    fromImage: string;
}



export interface NewsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    articles: NewsArticle[];
    topicArticles: NewsArticle[];
    selectedArticle?: NewsArticle | null;
    categories: string[]; // Store categories in the state
    categoryArticles: {
        [key: string]: NewsArticle[];
    };
  }
  
  const initialState: NewsState = {
    status: 'idle',
    error: null,
    articles: [],
    topicArticles: [],
    selectedArticle: null,
    categories: [], 
    categoryArticles: {},
  }; 
  
  const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
      // You can add reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNewsArticles.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchNewsArticles.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
          state.status = 'succeeded';
          state.articles = action.payload;
          state.error = null;
        })
        .addCase(fetchNewsArticles.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchOneNewsArticle.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchOneNewsArticle.fulfilled, (state, action: PayloadAction<NewsArticle>) => {
          state.status = 'succeeded';
          state.selectedArticle = action.payload;
          state.error = null;
        })
        .addCase(fetchOneNewsArticle.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchNewsByCategory.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchNewsByCategory.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
          state.status = 'succeeded';
          state.articles = action.payload;
          state.error = null;
        })
        .addCase(fetchNewsByCategory.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchCategories.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
          state.categories = action.payload;
          state.error = null;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchVarietyTopicsNews.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchVarietyTopicsNews.fulfilled, (state, action: PayloadAction<topicsPageNews>) => {
          state.status = 'succeeded';
          state.categories = action.payload.categories;
          state.categoryArticles = action.payload.news;
          state.error = null;
        })
        .addCase(fetchVarietyTopicsNews.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchTopicNews.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchTopicNews.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
          state.status = 'succeeded';
          state.topicArticles = action.payload;
          state.error = null;
        })
        .addCase(fetchTopicNews.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    },
  });
  
  // Your existing selectors
  export const selectNewsArticles = (state: { news: NewsState }) => state.news.articles;
  export const selectSelectedArticle = (state: { news: NewsState }) => state.news.selectedArticle;
  export const selectNewsStatus = (state: { news: NewsState }) => state.news.status;
  export const selectNewsError = (state: { news: NewsState }) => state.news.error;
  
  // New selector to get categories
  export const selectNewsCategories = (state: { news: NewsState }) => state.news.categories;
  export const selectCategoryArticles = (state: { news: NewsState }) => state.news.categoryArticles;
  export const selectTopicArticles = (state: { news: NewsState }) => state.news.topicArticles;
  
  export default newsSlice.reducer;