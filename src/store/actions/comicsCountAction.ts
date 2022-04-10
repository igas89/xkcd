import { ThunkAction } from 'redux-thunk';

import { apiAction } from 'api';
import { ApiAction } from 'types/api';
import { RootState } from 'types/store';

export const COMICS_COUNT_REQUEST = 'COMICS_COUNT_REQUEST';
export const COMICS_COUNT_SUCCESS = 'COMICS_COUNT_SUCCESS';
export const COMICS_COUNT_FAILURE = 'COMICS_COUNT_FAILURE';

export interface FetchComicsCountProps {
  num: string;
}

export interface FetchComicsCount {
  (): FetchComicsCountReturn;
}

export type FetchComicsCountReturn = ThunkAction<void, RootState, undefined, ApiAction<FetchComicsCountProps>>;
export type ComicsCountConstants = Record<'COMICS_COUNT_REQUEST' | 'COMICS_COUNT_SUCCESS' | 'COMICS_COUNT_FAILURE', string>;

export const fetchComicsCount: FetchComicsCount = (): FetchComicsCountReturn => (dispatch) => {
  dispatch(apiAction({
    type: [COMICS_COUNT_REQUEST, COMICS_COUNT_SUCCESS, COMICS_COUNT_FAILURE],
    payload: {
      params: {
        num: 'latest'
      }
    }
  }));
};