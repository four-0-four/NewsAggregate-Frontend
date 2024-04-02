import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { fetchCategories, fetchNewsArticles, fetchOneNewsArticle, fetchOneNewsArticleAuthenticated, fetchTopicNews, getAllBookmarksForUser } from './thunks';

function formatDateToString(date: Date) {
  const pad = (number: number) => (number < 10 ? `0${number}` : number);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // getMonth() is zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export interface NewsArticle {
    id: number;
    title: string;
    shortSummary: string;
    longSummary: string;
    content: string;
    publishedDate: string; // Or Date, if you prefer
    language_id: number;
    isInternal: boolean;
    ProcessedForIdentity: boolean;
    summarized: boolean;
    createdAt: string; // Or Date
    updatedAt: string; // Or Date
    categories: string[];
    keywords: string[];
    media: string[];
    from: string;
    fromImage: string;
    externalLink?: string;
    isBookmarked?: boolean | null;
}

export interface CategoryState {
  'name'?: string;
  'news': NewsArticle[];
  'last_news_time': string;
  'number_of_articles_to_fetch'?: number;
  'status': 'idle' | 'loading' | 'succeeded' | 'failed' | 'done';
  'load_more'?: boolean;
}


export interface BookmarkState {
  'news': NewsArticle[];
  'status': 'idle' | 'loading' | 'succeeded' | 'failed' | 'done';
}


export interface NewsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    load_more: boolean;
    articles: CategoryState; // this is for home page
    selectedArticle?: NewsArticle | null;
    bookmarks: BookmarkState;
    categoryArticles: CategoryState[];
  }
  
  const initialState: NewsState = {
    status: 'idle',
    error: null,
    load_more: false,
    articles: { 
      news: [], 
      last_news_time:formatDateToString(new Date()), 
      status: 'idle', 
      number_of_articles_to_fetch: 10
    },
    selectedArticle: null,
    bookmarks: {
      news: [],
      status: 'idle', 
    },
    categoryArticles: [],
  }; 
  
  const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
      addBookmark(state, action: PayloadAction<number>) {
        localStorage.removeItem("bookmarks");
        // Find the article in all places it can exist and mark it as bookmarked
        const markAsBookmarked = (article: NewsArticle) => {
          if (!article.isBookmarked) {
            article.isBookmarked = true;
            if (!state.bookmarks.news.find(b => b.id === article.id)) {
              state.bookmarks.news.push(article);
            }
          }
        };

        // add it to selected articles
        if(state.selectedArticle?.id === action.payload){
          state.selectedArticle.isBookmarked = true;
          markAsBookmarked(state.selectedArticle);
        }
    
        // Look for the article in the general articles list and mark it
        state.articles.news.forEach(article => {
          if (article.id === action.payload) {
            article.isBookmarked = true;
            markAsBookmarked(article);
          }
        });
    
        // Look for the article in each category and mark it
        state.categoryArticles.forEach(category => {
          category.news.forEach(article => {
            if (article.id === action.payload) {
              article.isBookmarked = true;
              markAsBookmarked(article);
            }
          });
        });
      },
      removeBookmark(state, action: PayloadAction<number>) {
        localStorage.removeItem("bookmarks");
        // Function to unmark an article as bookmarked
        const unmarkAsBookmarked = (article: NewsArticle) => {
            if (article.isBookmarked) {
                article.isBookmarked = false;
            }
        };
    
        // Unmark the selected article if it is the one being unbookmarked
        if (state.selectedArticle?.id === action.payload) {
            state.selectedArticle.isBookmarked = false;
        }
    
        // Iterate over the general articles list and unmark the article
        state.articles.news.forEach(article => {
            if (article.id === action.payload) {
                unmarkAsBookmarked(article);
            }
        });
    
        // Iterate over each category and unmark the article
        state.categoryArticles.forEach(category => {
            category.news.forEach(article => {
                if (article.id === action.payload) {
                    unmarkAsBookmarked(article);
                }
            });
        });
    
        // Remove the article from the bookmarks list
        state.bookmarks.news = state.bookmarks.news.filter(article => article.id !== action.payload);
      },
      addFeed(state, action: PayloadAction<CategoryState>) {
        state.articles.news = action.payload.news;
        state.articles.last_news_time = action.payload.last_news_time;
        state.load_more = action.payload.load_more || false;
        state.articles.number_of_articles_to_fetch = action.payload.number_of_articles_to_fetch;
        state.articles.status = action.payload.status;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNewsArticles.pending, (state) => {
          state.status = 'loading';
          state.articles.status = 'loading';
          state.error = null;
        })
        .addCase(fetchNewsArticles.fulfilled, (state, action: PayloadAction<{articles:NewsArticle[], last_news_time:string, load_more:boolean}>) => {
          state.status = 'succeeded';
          if(action.payload.articles.length !== 0){
              // Filter out new articles that are already present in the current news based on their id
              const newUniqueArticles = action.payload.articles.filter(newArticle => 
                  !state.articles.news.some(currentArticle => currentArticle.id === newArticle.id));
              
              // Extend the current articles array by adding only new, unique articles
              state.articles.news = [
                ...state.articles.news,
                ...newUniqueArticles
              ];
          }
          
          state.articles.last_news_time = action.payload.last_news_time;
          state.articles.number_of_articles_to_fetch = 10;
          state.articles.status = 'succeeded';
          state.load_more = action.payload.load_more;
          localStorage.setItem("feed", JSON.stringify({ articles: state.articles.news as NewsArticle[], last_news_time: state.articles.last_news_time, load_more: state.load_more }));
          state.error = null;
        })
        .addCase(fetchNewsArticles.rejected, (state, action) => {
          state.status = 'failed';
          state.articles.status = 'failed';
          state.articles.news = [];
          state.articles.last_news_time = formatDateToString(new Date());
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
        .addCase(fetchOneNewsArticleAuthenticated.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchOneNewsArticleAuthenticated.fulfilled, (state, action: PayloadAction<NewsArticle>) => {
          state.status = 'succeeded';
          state.selectedArticle = action.payload;
          state.error = null;
        })
        .addCase(fetchOneNewsArticleAuthenticated.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchCategories.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
      
          // Iterate through the fetched categories
          action.payload.forEach(categoryName => {
              // Check if the category already exists in categoryArticles
              let categoryExists = state.categoryArticles.some(category => category.name === categoryName);
              if (!categoryExists) {
                  // If the category does not exist, create a new CategoryState for it
                  state.categoryArticles.push({
                      name: categoryName,
                      news: [],
                      number_of_articles_to_fetch: 10,
                      last_news_time: formatDateToString(new Date()), // Initialize with empty or default values
                      status: 'idle'
                  });
              }
          });
      
          state.error = null;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchTopicNews.pending, (state, action) => {
          const topic = action.meta.arg;
          const categoryIndex = state.categoryArticles.findIndex(category => category.name === topic);
      
          if (categoryIndex !== -1) {
              // If the category is found, update its status
              state.categoryArticles[categoryIndex].status = 'loading';
          } else {
              // If the category is not found, add it with a loading status
              state.categoryArticles.push({
                  name: topic,
                  news: [],
                  number_of_articles_to_fetch: 10,
                  last_news_time: formatDateToString(new Date()), // Initialize with empty or default values
                  status: 'loading'
              });
          }
          state.error = null;
        })
        .addCase(fetchTopicNews.fulfilled, (state, action: PayloadAction<{ articles: NewsArticle[]; last_news_time: string ; topic: string; load_more: boolean }>) => {
          state.status = 'succeeded';
          // Find the index of the category in categoryArticles
          const categoryIndex = state.categoryArticles.findIndex(category => category.name === action.payload.topic);
        
          if (categoryIndex !== -1) {
              // Get the current news articles for the category
              const currentNews = state.categoryArticles[categoryIndex].news;
              
              if(action.payload.articles.length !== 0){
                // Filter out new articles that are already present in the current news based on their id
                const newUniqueArticles = action.payload.articles.filter(newArticle => 
                    !currentNews.some(currentArticle => currentArticle.id === newArticle.id));
                
                // If the category is found, update its news array by adding only new, unique articles
                state.categoryArticles[categoryIndex].news = [
                  ...currentNews,
                  ...newUniqueArticles
                ];
              }
              state.categoryArticles[categoryIndex].status = (action.payload.articles.length === 0)?'done':'succeeded';
              state.categoryArticles[categoryIndex].last_news_time = action.payload.last_news_time;
          } else {
              // If the category is not found, create a new CategoryState for it with the provided articles
              state.categoryArticles.push({
                  name: action.payload.topic,
                  news: action.payload.articles,
                  number_of_articles_to_fetch: 10,
                  last_news_time: action.payload.last_news_time,
                  status: 'succeeded'
              });
          }
          
          state.load_more = action.payload.load_more;
          state.error = null;
        })
        .addCase(fetchTopicNews.rejected, (state, action) => {
          const topic = action.meta.arg;
          const categoryIndex = state.categoryArticles.findIndex(category => category.name === topic);
      
          if (categoryIndex !== -1) {
              // If the category is found, update its status
              state.categoryArticles[categoryIndex].status = 'failed';
          } else {
              // If the category is not found, add it with a loading status
              state.categoryArticles.push({
                  name: topic,
                  news: [],
                  number_of_articles_to_fetch: 10,
                  last_news_time: formatDateToString(new Date()), 
                  status: 'failed'
              });
          }
          state.error = null;
        })
        .addCase(getAllBookmarksForUser.pending, (state) => {
          state.bookmarks.status = 'loading';
        })
        .addCase(getAllBookmarksForUser.fulfilled, (state, action) => {
          state.bookmarks.status = 'succeeded';
          // Assuming the API response directly contains an array of bookmarked news articles
          state.bookmarks.news = action.payload.bookmarks;
        })
        .addCase(getAllBookmarksForUser.rejected, (state, action) => {
          state.bookmarks.status = 'failed';
          state.error = action.payload;
        })
    },
  });

  export const {} = newsSlice.actions;

  
  // Your existing selectors
  export const selectNewsArticles = (state: { news: NewsState }) => state.news.articles;
  export const selectSelectedArticle = (state: { news: NewsState }) => state.news.selectedArticle;
  export const selectNewsStatus = (state: { news: NewsState }) => state.news.status;
  export const selectNewsError = (state: { news: NewsState }) => state.news.error;
  export const selectLoadMore = (state: { news: NewsState }) => state.news.load_more;
  export const selectBookmarks = (state: { news: NewsState }) => state.news.bookmarks;
  export const { addBookmark, removeBookmark, addFeed } = newsSlice.actions;
  
  // New selector to get categories
  export const selectCategoryArticles = (state: { news: NewsState }) => state.news.categoryArticles;
  export const selectNewsCategories = (state: { news: NewsState }) => state.news.categoryArticles.map(category => category.name);
  export default newsSlice.reducer;