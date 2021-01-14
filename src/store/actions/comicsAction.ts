import { ThunkAction } from 'redux-thunk';

import { apiAction } from 'api';
import { ApiAction } from 'types/api';
import { RootState } from 'types/store';

export const COMICS_REQUEST = 'COMICS_REQUEST';
export const COMICS_SUCCESS = 'COMICS_SUCCESS';
export const COMICS_FAILURE = 'COMICS_FAILURE';

export interface FetchComicsProps {
    num: number | 'latest';
}
export interface FetchComics {
    (num: FetchComicsProps['num']): FetchComicsReturn
}

export type FetchComicsReturn = ThunkAction<void, RootState, undefined, ApiAction<FetchComicsProps>>;
export type ComicsConstants = Record<'COMICS_REQUEST' | 'COMICS_SUCCESS' | 'COMICS_FAILURE', string>;

export const fetchComics: FetchComics = (num): FetchComicsReturn => (dispatch) => {
    dispatch(apiAction({
        type: [COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE],
        payload: {
            params: {
                num
            }
        },
    }))
}