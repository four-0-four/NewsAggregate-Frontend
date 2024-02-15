import News from "@/src/pages/news";
import { createSlice } from "@reduxjs/toolkit";
import { addNewsSourceBlacklist, addNewsSourcePreference, getAllNewsSources, getAllUserNewsSourcesBlacklist, getAllUserNewsSourcesPreferences, removeNewsSourceBlacklist, removeNewsSourcePreference } from "./thunks";

export interface NewsSourceState {
    id: number,
    name: string,
    parent: string,
    url: string,
    language: string,
    location: string,
    logo: string,
}

export interface state {
    allNewsSources: NewsSourceState[],
    InterestedNewsSources: NewsSourceState[],
    BlacklistedNewsSources: NewsSourceState[],
    status: string,
    error: string,
}

export const initialState: state = {
    allNewsSources: [],
    InterestedNewsSources: [],
    BlacklistedNewsSources: [],
    status: 'idle',
    error: '',
};

const newsSourceSlice = createSlice({
    name: 'newsSource',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(addNewsSourcePreference.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addNewsSourcePreference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeNewsSourcePreference.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(removeNewsSourcePreference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addNewsSourceBlacklist.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addNewsSourceBlacklist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeNewsSourceBlacklist.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(removeNewsSourceBlacklist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getAllNewsSources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allNewsSources = action.payload;
      })
      .addCase(getAllNewsSources.pending, (state) => {
        state.status = 'loading';
        state.error = "";
      })
      .addCase(getAllNewsSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getAllUserNewsSourcesPreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.InterestedNewsSources = action.payload;
      })
      .addCase(getAllUserNewsSourcesPreferences.pending, (state) => {
        state.status = 'loading';
        state.error = "";
      })
      .addCase(getAllUserNewsSourcesPreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getAllUserNewsSourcesBlacklist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.BlacklistedNewsSources = action.payload;
      })
      .addCase(getAllUserNewsSourcesBlacklist.pending, (state) => {
        state.status = 'loading';
        state.error = "";
      })
      .addCase(getAllUserNewsSourcesBlacklist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
    }
});


export const allNewsSources = (state: { newsSource: state }) => state.newsSource.allNewsSources;
export const InterestedNewsSources = (state: { newsSource: state }) => state.newsSource.InterestedNewsSources;
export const BlacklistedNewsSources = (state: { newsSource: state }) => state.newsSource.BlacklistedNewsSources;
export const newsSourceStatus = (state: { newsSource: state }) => state.newsSource.status;
export default newsSourceSlice.reducer;