// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/slice';
import newsReducer from './features/news/slice';
import newsSourceReducer from './features/newsSource/slice';

export const makeStore = ()=> {
  return configureStore({
    reducer: {
      user: userReducer,
      news: newsReducer,
      newsSource: newsSourceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    })
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
