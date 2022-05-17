import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiAction } from 'api';

import { comicsCountActions } from '../comicsCountSlice';

import { ApiResponseError } from 'interfaces/api';

import {
  ComicsRequest,
  ComicsResponse,
} from 'interfaces/comicsModel';

export interface ComcisAction {
  payload: ComicsRequest;
  response: ComicsResponse;
  error: ApiResponseError;
}

export interface ComicsState {
  payload?: ComicsRequest;
  response?: ComicsResponse;
  isFetching: boolean;
  isFailure: boolean;
  error: ApiResponseError | null;
}

const initialState: ComicsState = {
  payload: undefined,
  response: undefined,
  isFetching: false,
  isFailure: false,
  error: null,
};

const comicsSlice = createSlice({
  name: 'comics',
  initialState,
  reducers: {
    request(state, { payload }: PayloadAction<ComcisAction['payload']>) {
      state.payload = payload;
      state.response = initialState.response;
      state.isFetching = true;
      state.isFailure = false;
    },
    success(state, { payload }: PayloadAction<ComcisAction['response']>) {
      state.response = payload;
      state.isFetching = false;
    },
    failure(state, { payload }: PayloadAction<ComcisAction['error']>) {
      state.error = payload;
      state.isFetching = false;
      state.isFailure = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(comicsCountActions.success, (state, action) => {
      state.response = action.payload;
    });
  }
});

export const apiActionComicsRequest = ({ num }: ComicsRequest) => apiAction({
  endpoint: `/api/comic`,
  method: 'GET',
  params: { num },
  types: [
    comicsActions.request.type,
    comicsActions.success.type,
    comicsActions.failure.type,
  ],
});

export const {
  reducer: comicsReducer,
  actions: comicsActions,
} = comicsSlice;
