import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchNewsArticles, fetchNewsByCategory, fetchOneNewsArticle, fetchTopicNews } from './thunks';

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
    articles: NewsArticle[]; // this is for home page
    topicArticles: NewsArticle[]; // this is for  topic page
    selectedArticle?: NewsArticle | null;
    categories: string[]; // this is for explore page
    categoryArticles: { // this is for explore page
        [key: string]: NewsArticle[]|string;
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
      setCategories: (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      }
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
        
            // Initialize a new object for categoryArticles
            let newCategoryArticles = {...state.categoryArticles};
            // Iterate through the categories
            action.payload.forEach(category => {
                if (!newCategoryArticles[category]) {
                    // Add the category with an empty list if it doesn't exist
                    newCategoryArticles[category] = "loading";
                }
            });
        
            // Update the state with the new categoryArticles
            state.categoryArticles = newCategoryArticles;
            state.error = null;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchTopicNews.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchTopicNews.fulfilled, (state, action: PayloadAction<{ articles: NewsArticle[]; topic: string }>) => {
          state.status = 'succeeded';
          state.topicArticles = action.payload.articles;
          state.categoryArticles[action.payload.topic] = action.payload.articles;
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