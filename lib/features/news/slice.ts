import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNewsArticles, fetchOneNewsArticle } from './thunks';

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
    selectedArticle?: NewsArticle | null;
}

const initialState: NewsState = {
    status: 'idle',
    error: null,
    articles: [],
    selectedArticle: null
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
                console.log("success")
                console.log(action.payload)
                state.error = null;
            })
            .addCase(fetchOneNewsArticle.rejected, (state, action) => {
                state.status = 'failed';
                console.log("failed")
                console.log(action.payload)
                state.error = action.payload;
            });
    },
});

export const selectNewsArticles = (state: { news: NewsState }) => state.news.articles;
export const selectchoosenArticle = (state: { news: NewsState }) => state.news.selectedArticle;
export const selectNewsStatus = (state: { news: NewsState }) => state.news.status;
export const selectNewsError = (state: { news: NewsState }) => state.news.error;

export default newsSlice.reducer;