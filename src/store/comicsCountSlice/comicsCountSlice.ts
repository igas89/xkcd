import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiAction } from 'api';

import { ApiResponseError } from 'interfaces/api';

import {
  ComicsResponse,
  ComicsCountRequest,
  ComicsCountResponse,
} from 'interfaces/comicsModel';

export interface ComcisCountAction {
  payload: ComicsCountRequest;
  response: ComicsResponse;
  error: ApiResponseError;
}

export interface ComicsCountState {
  payload?: ComicsCountRequest;
  response?: ComicsCountResponse;
  isFetching: boolean;
  isFailure: boolean;
  error: ApiResponseError | null;
}

const initialState: ComicsCountState = {
  payload: undefined,
  response: undefined,
  isFetching: false,
  isFailure: false,
  error: null,
};

const comicsCountSlice = createSlice({
  name: 'comicsCount',
  initialState,
  reducers: {
    request(state, { payload }: PayloadAction<ComcisCountAction['payload']>) {
      state.payload = payload;
      state.response = initialState.response;
      state.isFetching = true;
      state.isFailure = false;
    },
    success(state, { payload }: PayloadAction<ComcisCountAction['response']>) {
      state.response = { counts: payload.num } as ComicsCountResponse;
      state.isFetching = false;
    },
    failure(state, { payload }: PayloadAction<ComcisCountAction['error']>) {
      state.error = payload;
      state.isFetching = false;
      state.isFailure = true;
    },
  },
});

export const apiActionComicsRequest = (payload?: ComicsCountRequest) => apiAction({
  endpoint: `/api/comic`,
  method: 'GET',
  params: {
    num: payload?.num || 'latest'
  } as ComicsCountRequest,
  types: [
    comicsCountActions.request.type,
    comicsCountActions.success.type,
    comicsCountActions.failure.type,
  ],
});

export const {
  reducer: comicsCountReducer,
  actions: comicsCountActions,
} = comicsCountSlice;
