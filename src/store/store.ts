import { Action, combineReducers } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';

import ApiMiddleWare from 'middleware/ApiMiddleWare';
import rootReducers from './rootReduces';

const combineRootReducer = combineReducers(rootReducers);

export const store = configureStore({
  devTools: true,
  reducer: combineRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat([
        ApiMiddleWare,
      ])
});

export type RootState = ReturnType<typeof combineRootReducer>;
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;